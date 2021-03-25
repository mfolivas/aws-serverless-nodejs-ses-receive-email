# aws-serverless-nodejs-ses-receive-email

This example shows how to receive an email header with SES, trigger a lambda function, process headers or accept or reject emails.

## Use-cases

- Post-process of email header.
- accept or reject emails

## Setup

- [Create a SES verified Domain](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-getting-started-verify.html) but do not setup the "Rule Set"
- if you change the region check if SES receiving exists in your region
- if you change the function names you will need to update the normalized function name used in the resource section - e.g. processacceptreject => ProcessacceptrejectLambdaFunction

## Deploy

In order to deploy the example, simply run:

```bash
serverless deploy
```



## Setup SNS Email Receiving Rule for process header

1) Open the Amazon SES console at https://console.aws.amazon.com/ses/
2) In the navigation pane, under Email Receiving, choose Rule Sets.
3) Choose **Create a Receipt Rule**.
4) On the Recipients page, choose **Next Step**. (Without a adding any recipients, Amazon SES applies this rule to all recipients)
5) For **Add action**, choose **lambda**.
6) For **Lambda function**, choose the lambda function with the name **aws-node-ses-receive-email-header-dev-processheader** you defined in `serverless.yml`
6) **Invocation type** choose **Event**
7) Choose **Next Step**
8) On the **Rule Details** page, for **Rule name**, type **my-rule**. Select the check box next to **Enabled**, and then choose **Next Step**.
9) On the **Review** page, choose **Create Rule**.

## Setup SNS Email Receiving Rule for accept or reject emails


6) For **Lambda function**, choose the lambda function with the name **aws-node-ses-receive-email-header-dev-processacceptreject** you defined in `serverless.yml`
6) **Invocation type** choose **RequestResponse** (Lambda function will be called synchronously to control mail flow)
7) Choose **Next Step**
8) On the **Rule Details** page, for **Rule name**, type **my-rule**. Select the check box next to **Enabled**, and then choose **Next Step**.
9) On the **Review** page, choose **Create Rule**.



## Usage

Send a test email to the receipt.


```
serverless logs -t --function incomingSesEmailParser
```