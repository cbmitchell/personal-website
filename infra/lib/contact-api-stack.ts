import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2'
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as path from 'path'

export class ContactApiStack extends cdk.Stack {
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
      runtime: lambda.Runtime.NODEJS_20_X,
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
    const httpApi = new apigwv2.HttpApi(this, 'ContactApi', {
      apiName: 'PersonalSiteContactApi',
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

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: httpApi.apiEndpoint,
      description: 'Contact API endpoint URL',
    })
  }
}
