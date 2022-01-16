import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class DnsStack extends Stack {
  public readonly hostedZone: route53.IHostedZone;
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName = "wordle.yamatatsu.dev";

    const hostedZone = new route53.PublicHostedZone(this, "HostedZone", {
      zoneName: domainName,
    });

    const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      hostedZone,
      domainName: domainName,
      subjectAlternativeNames: ["*." + domainName],
      region: "us-east-1",
    });

    this.hostedZone = hostedZone;
    this.certificate = certificate;
  }
}
