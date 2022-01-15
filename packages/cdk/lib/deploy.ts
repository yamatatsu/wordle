import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as deployment from "aws-cdk-lib/aws-s3-deployment";

type Props = StackProps & {
  bucket: s3.IBucket;
  sourcePath: string;
};

export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { bucket, sourcePath } = props;

    new deployment.BucketDeployment(this, "Deployment", {
      destinationBucket: bucket,
      sources: [deployment.Source.asset(sourcePath)],
    });
  }
}
