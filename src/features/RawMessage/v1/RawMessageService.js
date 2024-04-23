const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {createPaymentRequest} = require('../../ReceivedPaymentInfo/v1/ReceivedPaymentInfoService');
const {extractDetails} = require('../../../utils/index');

async function upsertRawMessage(rawMessage) {
    if (rawMessage) {
      try {
        const _message = await prisma.raw_message.create({
          data: {
            receiver: rawMessage.sender,
            message: rawMessage.message,
            },
        });
        const _response = extractDetails(rawMessage.message);
        if(_response?.amount && _response?.utrNumber){
          createPaymentRequest({amount:_response.amount,utr: _response.utrNumber});
          await prisma.raw_message.update({
            where:{
              id : _message.id
            },
            data:{
              processed: 1
            }
          })
        }
        else{
          await prisma.raw_message.update({
            where:{
              id : _message.id
            },
            data:{
              processed: 2
            }
          })
        }
        return _message;
      } catch (error) {
        throw error;
      }
    }
}

module.exports = {
    upsertRawMessage,
};