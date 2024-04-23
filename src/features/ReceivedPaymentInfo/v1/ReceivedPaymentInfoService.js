const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPaymentRequest(data,options){
  console.log(`data recivied${data.amount}`)
  const client = (options?.tx)?options.tx:prisma;
    
  const response=await prisma.received_payment_info.findMany({})
  console.log(response)
  return await client.received_payment_info.create({
    data: {
        amount: data.amount,
        utr: data.utr,
        status: 0
    }
  });
}

module.exports = {
    createPaymentRequest,
};