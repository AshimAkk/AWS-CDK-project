import * as cdk from 'aws-cdk-lib';  
import { Construct } from 'constructs';  
import * as ec2 from 'aws-cdk-lib/aws-ec2';  
import * as rds from 'aws-cdk-lib/aws-rds';

// create an interface to accept the VPC from our VPC stack

interface RDSStackProps extends cdk.StackProps {vpc: ec2.Vpc;}

// Set up basic stack structure 

export class RDSStack extends cdk.Stack { 
    constructor(scope: Construct, id: string, props: RDSStackProps) {
       super(scope, id, props) 
    }
}