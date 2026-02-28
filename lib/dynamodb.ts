import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ 
  region: process.env.REGION || 'us-east-1'
})
export const dynamodb = DynamoDBDocumentClient.from(client)

export const TABLES = {
  PICTURES: process.env.DYNAMODB_PICTURES_TABLE || 'celebration-pictures',
  STORIES: process.env.DYNAMODB_STORIES_TABLE || 'celebration-stories',
  RSVPS: process.env.DYNAMODB_RSVPS_TABLE || 'celebration-rsvps'
}
