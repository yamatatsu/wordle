import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";

type Props = StackProps & {};

export class SiteStack extends Stack {
  public readonly bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "Bucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const oai = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    bucket.grantRead(oai);

    new cloudfront.CloudFrontWebDistribution(this, "Distribution", {
      defaultRootObject: "index.html",
      enableIpV6: true,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: oai,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              // TODO: 開発中はキャッシュを弱くする
              defaultTtl: Duration.seconds(10),
              minTtl: Duration.seconds(10),
              maxTtl: Duration.seconds(10),
            },
          ],
        },
      ],
      // TODO: SET
      // errorConfigurations: [],
      // TODO: SET
      // viewerCertificate?: ViewerCertificate;
    });

    this.bucket = bucket;
  }
}
