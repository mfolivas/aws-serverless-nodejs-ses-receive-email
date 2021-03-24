'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: getAllEmails(event.Records),
      },
      null,
      2
    ),
  }
}


module.exports.acceptReject = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: fetchAllInvalidReceipt(event.Records),
      },
      null,
      2
    ),
  };
}

const getAllEmails = records => {
  return (records) ? records.map(record => record.ses.mail) : undefined
}

const fetchAllInvalidReceipt = records => {
  const receipts = records.map(record => record.ses.receipt)
  const { spfVerdict, dkimVerdict, spamVerdict, virusVerdict } = receipts
  if (
    spfVerdict.status === 'FAIL' ||
    dkimVerdict.status === 'FAIL' ||
    spamVerdict.status === 'FAIL' ||
    virusVerdict.status === 'FAIL'
  ) {
    return { disposition: 'STOP_RULE_SET' }
  }
}