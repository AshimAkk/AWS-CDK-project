import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

/// Props

interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class EC2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);

        // First public subnet 
        const instance3 = new ec2.Instance(this, 'Public-1-AZ3', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
                availabilityZones: [props.vpc.availabilityZones[0]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        })

            cdk.Tags.of(instance3).add('Name', 'PublicEC2-1-AZ3')

            // second public subnet 

            const instance4 = new ec2.Instance(this, 'Public-1-AZ4', {
                vpc: props.vpc,
                vpcSubnets: {
                    subnetType: ec2.SubnetType.PUBLIC,
                    availabilityZones: [props.vpc.availabilityZones[1]]
                },
                machineImage: new ec2.AmazonLinuxImage({
                    generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
                }),
                instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
            })
    
                cdk.Tags.of(instance4).add('Name', 'PublicEC2-1-AZ4')


        // first database instance 

        const instance1 = new ec2.Instance(this, 'PrivateEC2-1-AZ1', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                availabilityZones: [props.vpc.availabilityZones[0]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        })

            cdk.Tags.of(instance1).add('Name', 'PrivateEC2-1-AZ1')

        // Second Database instance

        const instance2 = new ec2.Instance(this, 'PrivateEC2-2-AZ2', {
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                availabilityZones: [props.vpc.availabilityZones[1]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)


        })
            cdk.Tags.of(instance2).add('Name', 'PrivateEC2-2-AZ2')

    }
}