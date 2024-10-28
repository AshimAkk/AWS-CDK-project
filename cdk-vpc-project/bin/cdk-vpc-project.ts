#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkVpcProjectStack } from '../lib/cdk-vpc-project-stack';
import { EC2Stack } from '../lib/ec2-stack';

const app = new cdk.App();
const vpcStack = new CdkVpcProjectStack(app, 'CdkVpcProjectStack', {
 
});

new EC2Stack(app, 'MyEC2Stack', {
  vpc:vpcStack.vpc
})