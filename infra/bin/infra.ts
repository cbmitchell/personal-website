#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { ContactApiStack } from '../lib/contact-api-stack'

const app = new cdk.App()

new ContactApiStack(app, 'PersonalSiteContactApi', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
