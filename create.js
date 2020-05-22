import { v4 as uuidv4 } from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'ext-product',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      productId: uuidv4(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false, error });
  }
}
