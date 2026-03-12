#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { SiteApiStack } from '../lib/site-api-stack'

const app = new cdk.App()

new SiteApiStack(app, 'PersonalSiteApi', {
  // stackName is pinned to the original name to avoid redeploying as a new
  // CloudFormation stack and conflicting with existing deployed resources.
  stackName: 'PersonalSiteContactApi',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
