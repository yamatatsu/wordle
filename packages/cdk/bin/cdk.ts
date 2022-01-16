import * as cdk from "aws-cdk-lib";
import { DnsStack } from "../lib/dns";
import { DeployStack } from "../lib/deploy";
import { SiteStack } from "../lib/site";

const env = {
  region: "ap-northeast-1",
  // デプロイ先環境のうっかりミスを防ぐためにaccountを指定する
  account: "660782280015",
};

const app = new cdk.App();

const { hostedZone, certificate } = new DnsStack(app, "WordleDns", { env });
const { bucket } = new SiteStack(app, "WordleSite", {
  hostedZone,
  certificate,
  env,
});
new DeployStack(app, "WordleDeploy", {
  bucket: bucket,
  sourcePath: `../app/dist`,
  env,
});
