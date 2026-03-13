#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { SiteApiStack } from '../lib/site-api-stack'

const app = new cdk.App()

new SiteApiStack(app, 'PersonalWebsite', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
