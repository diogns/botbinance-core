import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { NotificationEntity } from '@notification/domain/entities/notification.entity';

export class DynamoDBService {
  ddbConf: any = {
    region: process.env.AWS_REGION,
  };
  client: DynamoDBClient;
  dynamoDBDocument: DynamoDBDocument;

  constructor() {
    if (process.env.ENVIRONMENT === 'LOCAL')
      this.ddbConf.endpoint = process.env.DYNAMODB_ENDPOINT;

    this.client = new DynamoDBClient(this.ddbConf);

    const marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: false,
    };
    const unmarshallOptions = {
      wrapNumbers: false,
    };

    const translateConfig = { marshallOptions, unmarshallOptions };

    this.dynamoDBDocument = DynamoDBDocument.from(this.client, translateConfig);
  }

  async createNotification(notification: NotificationEntity): Promise<void> {
    await this.dynamoDBDocument.put({
      TableName: 'process.env.DYNAMODB_USER_TABLE_NAME',
      Item: {
        id: notification.id,
        userGroup: notification.userGroup,
        title: notification.title,
        message: notification.message,
        app: notification.app,
        country: notification.country,
        exp: notification.exp,
      },
    });
  }
}
