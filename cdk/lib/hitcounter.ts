import dynamodb = require('@aws-cdk/aws-dynamodb');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');

export interface HitCounterProps {
  downstream: lambda.Function;
}

export class HitCounter extends cdk.Construct {
  readonly handler: lambda.Function;

  readonly table: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'akimura-Hits', {
      partitionKey: {
        name: 'path',
        type: dynamodb.AttributeType.STRING
      }
    });
    this.table = table;

    this.handler = new lambda.Function(this, 'akimura-HitCounterHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hitcounter.handler',
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(this.handler);

    props.downstream.grantInvoke(this.handler);
  }
}
