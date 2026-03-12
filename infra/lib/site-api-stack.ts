import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2'
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as path from 'path'

export class SiteApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const senderEmail = this.node.tryGetContext('senderEmail')
    const recipientEmail = this.node.tryGetContext('recipientEmail')
    const allowedOrigins: string[] = this.node.tryGetContext('allowedOrigins') ?? []

    // Reference the Turnstile secret created manually in Secrets Manager
    const turnstileSecret = secretsmanager.Secret.fromSecretNameV2(
      this, 'TurnstileSecret', 'personal-site/turnstile-secret-key'
    )

    // Lambda function (bundled from TypeScript via esbuild)
    const contactFn = new nodejs.NodejsFunction(this, 'ContactHandler', {
      entry: path.join(__dirname, '..', 'lambda', 'contact', 'index.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(15),
      environment: {
        SENDER_EMAIL: senderEmail,
        RECIPIENT_EMAIL: recipientEmail,
        TURNSTILE_SECRET_NAME: 'personal-site/turnstile-secret-key',
      },
      bundling: {
        externalModules: ['@aws-sdk/*'],
      },
    })

    // Grant Lambda permission to read the Turnstile secret
    turnstileSecret.grantRead(contactFn)

    // Grant Lambda permission to send emails via SES
    contactFn.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ses:SendEmail'],
      resources: ['*'],
    }))

    // HTTP API with CORS
    const httpApi = new apigwv2.HttpApi(this, 'SiteApi', {
      apiName: 'PersonalSiteApi',
      corsPreflight: {
        allowOrigins: allowedOrigins,
        allowMethods: [apigwv2.CorsHttpMethod.POST],
        allowHeaders: ['Content-Type'],
      },
    })

    httpApi.addRoutes({
      path: '/contact',
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        'ContactIntegration', contactFn
      ),
    })

    // Analytics DynamoDB table
    const analyticsTable = new dynamodb.Table(this, 'AnalyticsEvents', {
      tableName: 'PersonalSiteAnalytics',
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // Analytics Lambda
    const analyticsFn = new nodejs.NodejsFunction(this, 'AnalyticsHandler', {
      entry: path.join(__dirname, '..', 'lambda', 'analytics', 'index.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(5),
      environment: { TABLE_NAME: analyticsTable.tableName },
      bundling: { externalModules: ['@aws-sdk/*'] },
    })

    analyticsTable.grantWriteData(analyticsFn)

    httpApi.addRoutes({
      path: '/analytics',
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration('AnalyticsIntegration', analyticsFn),
    })

    // Throttle the API to limit abuse
    const stage = httpApi.defaultStage?.node.defaultChild as apigwv2.CfnStage
    stage.defaultRouteSettings = {
      throttlingBurstLimit: 50,
      throttlingRateLimit: 10,
    }

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: httpApi.apiEndpoint,
      description: 'API endpoint URL',
    })
  }
}
