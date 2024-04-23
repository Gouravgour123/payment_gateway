const { PrismaClient, status_for_bank_account } = require('@prisma/client');
const prisma = new PrismaClient();

const mobileNumberRegex = /^\+91\s?[6-9]\d{9}$/;
function validateIFSC(ifsc) {
  const ifscRegex = /^[A-Za-z]{4}[0][A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
}

async function createBankAccount(name, bank_name, phone_number, account_number, confirm_account_number, ifsc) {
  try {
    if (!name || !bank_name || !phone_number || !account_number || !confirm_account_number || !ifsc) {
      throw new Error("All fields are mandatory");
    }
    if(!validateIFSC(ifsc)){
      throw new Error("invalid ifsc format")
     }
    if(!mobileNumberRegex.test(phone_number)){
      throw new  Error ("Invalid phone number format")
    }
    if (account_number !== confirm_account_number) {
      return new Error("account_number and confirm_account_number does not match");
    }
    const existingAccount = await prisma.bank_account.findFirst({
      where: {
        account_number: account_number,
      },
    });
    if (existingAccount) {
      throw new Error("account number  already exists");
    }
    const newBankAccount = await prisma.bank_account.create({
      data: {
        name: name,
        bank_name: bank_name,
        phone_number: phone_number,
        account_number: account_number,
        ifsc: ifsc
      }
    });
    return newBankAccount;
  } catch (error) {
    throw new Error(error.message);
  }
}



async function getBankAccount() {
  try {
    const bankAccount = await prisma.bank_account.findMany({
      where: {
        status: status_for_bank_account.active
      }
    });
    return bankAccount;
  }
  catch (error) {
    throw new Error(error.message);

  }
}



async function updateBankAccount(id, name, phone_number, status,res) {
  try {
    const _id = parseInt(id)

    const updatedBankAccount = await prisma.bank_account.update({
      where: {
        id: _id
      },
      data: {
        name,
        phone_number,
        status
      }
    });
    return updatedBankAccount;
  } catch (error) {
    throw new Error(error.message);

  }
}



async function deactivate_Bank_Account(id) {
  try {
    const _id = parseInt(id)
    const deleteBankAccount = await prisma.bank_account.update({
      where: {
        id: _id
      },
      data: {
        status: status_for_bank_account.inactive
      }
    })
    return { deleteBankAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}




async function getAllInactiveBankAccounts() {
  try {
    const inactiveAccounts = await prisma.bank_account.findMany({
      where: {
        status: status_for_bank_account.inactive,
      },
    });
    return inactiveAccounts;
  } catch (error) {
    console.error('Error retrieving inactive bank accounts:', error);
    throw new Error('Internal Server Error');
  }
}




async function deleteBankAccount(id) {
  try {
    const _id = parseInt(id)
    const deletedBankAccount = await prisma.bank_account.delete({
      where: {
        id: _id,
      }
    });
    return deletedBankAccount;
  } catch (error) {
    throw new Error(error.message);

  }
}





module.exports = {
  createBankAccount,
  getBankAccount,
  updateBankAccount,
  deleteBankAccount,
  deactivate_Bank_Account,
  getAllInactiveBankAccounts
};