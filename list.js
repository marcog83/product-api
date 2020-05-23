import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main() {
  const params = {
    TableName: 'ext-product' 
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (error) {
    return failure({ status: false,error });
  }
}
