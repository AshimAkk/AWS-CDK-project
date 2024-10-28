import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class CdkVpcProjectStack extends cdk.Stack {
  public readonly vpc:ec2.Vpc
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   this.vpc = new ec2.Vpc(this, 'CDK_VPC', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        },
        {
          name:'Database',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        }
      ]
    })

    new cdk.CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
      description: 'output the VPC ID'
    })

// SUCCESS FULL DEPLOYMENT TO CLOUDFORMATION VPC & INSTANCES
  }
}
