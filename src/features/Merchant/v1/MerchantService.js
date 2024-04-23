const { PrismaClient, status_for_merchant, status } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt=require('bcrypt')
const passwordValidator = require('password-validator')
const {generateSecrets}=require('../../../utils/keygenrator')
// const {decrypt,decryptBase64}=require('../../../utils/decryption');
// const { json } = require('express');
// const qr=require('qrcode')
// const uuuid = require("uuid");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;


function validatePassword(password) {
  const schema = new passwordValidator();
  schema
    .is().min(8)                             
    .has().uppercase()                    
    .has().lowercase()                             
    .has().digits()                                
    .has().symbols();                               
  return schema.validate(password);
}

function validateEmail(email)
 {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


async function createMerchant(name, email, password, platform_name) {
  try {
    const {key,encryptionIV}=generateSecrets()
    const hashedPassword=await bcrypt.hash(password,10)
    const defaultagent_code="1111"

    if (!name || !email || !password || !platform_name) {
      throw new Error("All fields are mandatory");
    }
    if(!validatePassword(password)){
      throw new Error("invalid password format")
     }
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }
    const existingemail = await prisma.merchant.findFirst({
      where: {
        email: email,
      },
    });
    if (existingemail) {
      throw new Error("email  already exists");
    }
    const newMerchant = await prisma.merchant.create({
      data: {
        name,
        email,
        password:hashedPassword,
        platform_name,
        secret_key:key,
        secret_IV:encryptionIV,
        agent_code:defaultagent_code, 
        status:status.active     
      }
    });
    return newMerchant;
  } catch (error) {
    throw new Error(error.message);
  }
}




async function loginMerchant(email, Merchantpassword) {
  try {
    const MerchantExists = await prisma.merchant.findFirst({
      where: { email: email },
    });
    if (MerchantExists) {
      const hashedPassword = MerchantExists.password;
      const isPasswordValid = await bcrypt.compare(
        Merchantpassword,
        hashedPassword
      );
      if (isPasswordValid) {
        const token = jwt.sign({ id: MerchantExists.id }, secret_key);
        return { token: token, message: "Merchant logged in successfully." };
      } else {
        return new Error("Incorrect password");
      }
    } else {
      return new Error("Merchant does not exist");
    }
  } catch (error) {
    console.error("Error logging in Merchant:", error);
    throw error;
  }
}


async function changePassword( merchant_id, oldPassword, newPassword){
  try{
    if(!validatePassword(newPassword)){
      throw  Error("invalid password format")
     }
    const merchant = await prisma.merchant.findFirst(merchant_id);
    if (!merchant) {
      return res.status(404).json({ error: 'merchant not found' });
    }
    const isPasswordCorrect = bcrypt.compare(oldPassword,merchant.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }
    const hashedPassword= await bcrypt.hash(newPassword,10)
    const response = await prisma.merchant.update({
      where:{
       id:merchant_id
      },
      data:{
        password:hashedPassword
      }
    })
    return ({ message: 'Password changed successfully' });
  } catch (error) {
    throw new Error(error.message)
  }
}






async function getMerchant() {
  try{
  const merchants = await prisma.merchant.findMany({ where:{
    status:status_for_merchant.active
  }});
  return merchants;
  }
  catch(error){
    throw new Error(error.message);
  }
}


async function updateMerchant( id, 
  name,
  email, 
  password,
   platform_name, 
   web_url,
   redirected_url,
   webhooks_url,
   status,
   res
   ) {
  try {
    const _id=parseInt(id)
    let hashedPassword;
    if(password){
       hashedPassword=await bcrypt.hash(password,10)
    if(!validatePassword(password)){
      throw new Error("invalid password format")
     }
    }
    if(email){
     if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    const existingEmail = await prisma.merchant.findFirst({
      where:{
        email:email,
      },
    });
    if(existingEmail && existingEmail.id !== _id){
        throw new Error( "email already exist")
    }
  }
  const updatedMerchant = await prisma.merchant.update({
    where: {
      id: _id
    },
    data: {
      name,
      email, 
      password:hashedPassword,
       platform_name, 
       web_url,
       redirected_url,
       webhooks_url,
       status
    }
  });
  return updatedMerchant;

} catch (error) {
  throw new Error(error.message);
}
}


async function updateSecret(id) {
  try {
    const _id=parseInt(id)
    const {key,encryptionIV}=generateSecrets()
  const updatedMerchant = await prisma.merchant.update({
    where: {
      id: _id
    },
    data: {
      secret_key:key,
      secret_IV:encryptionIV,
    }
  });
  return updatedMerchant;
} catch (error) {
  throw new Error(error.message); 
}
}


async function deactivate_merchant(id) {
  try {
    const _id=parseInt(id)
    const deletedUPI = await prisma.merchant.update({
      where: {
        id:_id
      },
      data:{
        status:status_for_merchant.inactive
      }
    })
    return {deletedUPI};
  } catch (error) {
    throw new Error(error.message);
  }
}


async function getAllInactiveMerchant() {
  try {
    const inactiveMerchant = await prisma.merchant.findMany({
      where: {
        status: status_for_merchant.inactive,
      },
    });
    return inactiveMerchant;
  } catch (error) {
    console.error('Error retrieving inactive merchant:', error);
    throw new Error('Internal Server Error');
  }
}


async function deleteMerchant(id) {
  try {
  const _id=parseInt(id)
  const deletedMerchant = await prisma.merchant.delete({
    where: {
      id: _id,
    }
  });
  return deletedMerchant;
} catch (error) {
  throw new Error(error.message);

}
}

// async function createrequest(data, id) {
//   try {
//     const _id=id.toString()
//     const createRequest = await prisma.user_payment_request.create({
//       data: {
//         request_amount: data.amount,
//         merchant_id: _id,
//         user_id: data.user_id,
//         status: "pending"
//       }
//     });
//     return createRequest
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// async function verifyPayRequest(Data){
//   try{
//  const [encryptedData, encryptedMerchantId] = Data.split(':');
//  const merchant_id=decryptBase64(encryptedMerchantId)
//  const _merchant_id=parseInt(merchant_id)
//   const merchantExists= await prisma.merchant.findFirst({
//       where:{
//         id:_merchant_id
//       }
//     })
//      if(!merchantExists){
//   throw new Error("merchant with this id does not exists")
// }
// if(merchantExists){
//   const data=  decrypt(encryptedData, merchantExists.secret_key
//     ,merchantExists.secret_IV)
//   const _data=JSON.parse(data)
//    const response = await createrequest(_data,merchantExists.id)
//    console.log(response)
//    return `https://securepay.fxfort.io/pay/${response.id}`
// }
// }
// catch(error){
// throw new Error(error.message); 
// }
// }

  // //logic needs to be updated
  // async function UPI(id){
  //   try{
  //     const UIIDExists= await prisma.user_payment_request.findFirst({
  //       where:{
  //         id:id
  //       }
  //     })
  //     if(!UIIDExists){
  //       throw new Error("UIID does not exists")
  //     }
  //     else{
  //       const response = await prisma.upi.findFirst({
  //         where: {
  //           status: 'active'
  //         },
  //         select: {
  //           upi_id: true
  //         }
  //       });
  //       const updateUPI= await prisma.user_payment_request.update({
  //         where:{
  //           id:id
  //         },
  //         data:{
  //          upi_id:response.upi_id
  //         }
  //       })
  //       console.log(updateUPI.upi_id)
  //       return {upi_id:updateUPI.upi_id,amount:updateUPI.request_amount}
  //     }
  //   }
  //   catch(error){
  //     throw new Error(error.message);
  //   }
  //   }

  // async function after_payment_info(id,utr){
  //   try{
  //     const utrExists= await prisma.received_payment_info.findFirst({
  //       where:{
  //         utr:utr,
  //         status: 0
  //       }
  //     })
      
  //     if(!utrExists){
  //       throw new Error ("tranction does not exists")
  //     }
  //     else{
  //        if(utr===utrExists.utr){
  //         const response = await prisma.user_payment_request.update({
  //           where: {
  //               id: id
  //           },
  //           data: {
  //               utr: utr,
  //               resolved: true,
  //               status:"sucess",
  //               amount_recived: utrExists.amount.toString(),
  //               updated_at: new Date()
  //           }
  //       })
  //       console.log(response)
  //       const updatestatus = await prisma.received_payment_info.update({
  //         where: {
  //             id: utrExists.id
  //         },
  //         data: {
  //             status: 1
  //         }
  //     });
  //       const userid= await response.user_id
  //       const redirectional = "https://merchant.codesfortomorrow.com/api/payment-Request/v1/success";
  //       const paymentdata={
  //         utr_id:utrExists.id.toString(),
  //         amount:utrExists.amount.toString(),
  //         uuuid:id.toString(),
  //         userid:userid.toString()
  //       }
  //       console.log(paymentdata)
  //       const Merchant_response = await axios.post('https://merchant.codesfortomorrow.com/api/payment-Request/v1/payment-details',{
  //       paymentdata    })
  //      return   {Merchant_response:Merchant_response.data,redirectional:redirectional}
  //        }
  //     }
  //   }
  //   catch(error){
  //     throw new Error(error.message); 
  //   }
  //   }

  //   async function verifywithdrwRequest(Data){
  //     try{
  //    const [encryptedData, encryptedMerchantId] = Data.split(':');
  //    const merchant_id=decryptBase64(encryptedMerchantId)
  //    const _merchant_id=parseInt(merchant_id)
  //   const merchantExists= await prisma.merchant.findFirst({
  //         where:{
  //           id:_merchant_id
  //         }
  //       })
  //       if(!merchantExists){
  //         throw new Error("merchant with this id does not exists")
  //       }
  //       if(merchantExists){
  //         const data=  decrypt(encryptedData, merchantExists.secret_key
  //           ,merchantExists.secret_IV)
  //         const _data=JSON.parse(data)
  //       const response = await createWithdrwrequest(_data,merchantExists.id)
  //         //  console.log(response)
  //       }
  //     }
  //     catch(error){
  //       throw new Error(error.message); 
  //     }
  //     }
      




module.exports = {
   createMerchant,
   loginMerchant,
   changePassword,
   getMerchant,
   updateMerchant,
    deleteMerchant,
    updateSecret,
    deactivate_merchant,
    getAllInactiveMerchant,
    // UPI,
    // verifywithdrwRequest,
    // verifyPayRequest,
    // after_payment_info,
  };