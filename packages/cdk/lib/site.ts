import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Target from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

type Props = StackProps & {
  hostedZone: route53.IHostedZone;
  certificate: acm.ICertificate;
};

export class SiteStack extends Stack {
  public readonly bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { hostedZone, certificate } = props;

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

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "Distribution",
      {
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
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            aliases: [hostedZone.zoneName],
          }
        ),
      }
    );

    new route53.ARecord(this, "ARecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Target.CloudFrontTarget(distribution)
      ),
    });

    this.bucket = bucket;
  }
}
