# DynamoDB Setup for AWS Amplify

## Environment Variables
Add these to your Amplify app environment variables:

```
AWS_REGION=us-east-1
DYNAMODB_PICTURES_TABLE=celebration-pictures
DYNAMODB_STORIES_TABLE=celebration-stories
DYNAMODB_RSVPS_TABLE=celebration-rsvps
```

## IAM Permissions
Your Amplify service role needs DynamoDB permissions. Add this policy to the Amplify service role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:DeleteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:067066335639:table/celebration-pictures",
        "arn:aws:dynamodb:us-east-1:067066335639:table/celebration-stories",
        "arn:aws:dynamodb:us-east-1:067066335639:table/celebration-rsvps"
      ]
    }
  ]
}
```

## Tables Created
- celebration-pictures
- celebration-stories  
- celebration-rsvps

All tables use PAY_PER_REQUEST billing mode.
