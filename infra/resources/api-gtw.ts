import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

import { getProvider } from './provider';
import { getTags } from './tags';
import { CreateVpcLinkSecurityGroup } from './security-groups';

const project = pulumi.getProject();

const awsConfig = new pulumi.Config('aws');
const apiConfig = new pulumi.Config('api');

const audience = apiConfig.require('audience');
const issuerUrl = apiConfig.require('issuerUrl');

const privateSubnets = awsConfig.require('privateSubnets');

const provider = getProvider();
const tags = getTags();

export function CreateApiGateway(
  listenerArn: pulumi.Output<string>,
): aws.apigatewayv2.Api {
  const apiGateway = new aws.apigatewayv2.Api(
    'httpApiGateway',
    {
      name: `app-${project}-api-gateway-http`,
      protocolType: 'HTTP',
      tags,
    },
    { provider },
  );

  const securityGroup = CreateVpcLinkSecurityGroup();

  const vpcLink = new aws.apigatewayv2.VpcLink(
    'vpcLink',
    {
      name: `app-${project}-vpc-link`,
      securityGroupIds: [securityGroup.id],
      subnetIds: privateSubnets.split(','),
      tags,
    },
    { provider },
  );

  const apiIntegration = new aws.apigatewayv2.Integration(
    'vpcLinkIntegration',
    {
      apiId: apiGateway.id,
      integrationType: 'HTTP_PROXY',
      integrationUri: listenerArn,
      integrationMethod: 'ANY',
      connectionType: 'VPC_LINK',
      connectionId: vpcLink.id,
    },
    { provider, dependsOn: [vpcLink, apiGateway] },
  );

  let apiRouteArgs = {
    apiId: apiGateway.id,
    routeKey: 'ANY /{proxy+}',
    target: pulumi.interpolate`integrations/${apiIntegration.id}`,
  };

  const apiRouteDepends: any = [apiIntegration, apiGateway];

  if (audience != '' && issuerUrl != '') {
    const apiAuthorizer = new aws.apigatewayv2.Authorizer(
      'apiAuthorizer',
      {
        apiId: apiGateway.id,
        name: `app-${project}-jwt-cognito-authorization`,
        authorizerType: 'JWT',
        identitySources: ['$request.header.Authorization'],
        jwtConfiguration: {
          audiences: audience.split(','),
          issuer: issuerUrl,
        },
      },
      { provider },
    );

    const authorizerParams = {
      authorizerId: apiAuthorizer.id,
      authorizationType: 'JWT',
    };

    apiRouteArgs = { ...apiRouteArgs, ...authorizerParams };
    apiRouteDepends.push(apiAuthorizer);
  }

  new aws.apigatewayv2.Route('apiRoute', apiRouteArgs, {
    provider,
    dependsOn: apiRouteDepends,
  });

  new aws.apigatewayv2.Stage(
    'apiStage',
    {
      apiId: apiGateway.id,
      name: '$default',
      autoDeploy: true,
    },
    { provider, dependsOn: [apiGateway] },
  );

  return apiGateway;
}
