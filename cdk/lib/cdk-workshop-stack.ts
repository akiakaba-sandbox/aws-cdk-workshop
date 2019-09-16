import apigw = require('@aws-cdk/aws-apigateway');
import lambda = require('@aws-cdk/aws-lambda');
import sam = require('@aws-cdk/aws-sam');
import cdk = require('@aws-cdk/core');

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hellooo = new lambda.Function(this, 'akimura-HelloooHandler', {
      code: lambda.Code.fromAsset('../functions/hello-world'),
      handler: 'hello.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });
    const hello = new sam.CfnFunction(this, 'akimura-HelloHandler', {
      codeUri: lambda.Code.fromAsset('../functions/hello-world').path,
      handler: 'hello.handler',
      runtime: lambda.Runtime.NODEJS_10_X.name,
      events: {
        HelloWorld: {
          type: 'Api',
          properties: {
            path: '/hello',
            method: 'get'
          }
        }
      }
    });

    const api = new apigw.LambdaRestApi(this, 'akimura-Endpoint', {
      handler: hellooo
    });
  }
}
