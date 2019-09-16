#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkWorkshopStack as AkimuraCdkWorkshopStack } from '../lib/cdk-workshop-stack';

const app = new cdk.App();
new AkimuraCdkWorkshopStack(app, 'AkimuraCdkWorkshopStack');
