import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

// create an interface to accept the VPC from our VPC stack

interface RDSStackProps extends cdk.StackProps { vpc: ec2.Vpc; }

// Set up basic stack structure 

export class RDSStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: RDSStackProps) {
        super(scope, id, props)


    // RDS Instance 

        const rdsInstance = new rds.DatabaseInstance(this, 'Database', {
            vpc:props.vpc,
            databaseName: 'rdsDatabase',
            engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),
            allocatedStorage: 20,
            maxAllocatedStorage: 30,
            multiAz: true,
            deletionProtection: false,
            backupRetention: cdk.Duration.days(0),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE),
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            }
        })
        cdk.Tags.of(rdsInstance).add('Name', 'RDS-instance')

       
  
    }

}
