import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const params = {
    TableName: 'ext-product',
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'productId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      productId: event.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false, error });
  }
}
