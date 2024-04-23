const { PrismaClient, status } = require("@prisma/client");
const prisma = new PrismaClient();

const mobileNumberRegex = /^\+91\s?[6-9]\d{9}$/;


async function createUPI(phone_number, upi_id) {
  try {
    if (!upi_id.includes("@")) {
      throw new Error("Please include '@' symbol in upi_id");
    }
    if(!mobileNumberRegex.test(phone_number)){
      throw new  Error ("Invalid phone number format")
    }
    const existingnumber = await prisma.upi.findFirst({
      where: {
        phone_number: phone_number,
      },
    });
    if (existingnumber) {
      throw new Error("phone number  already exists");
    }
    const existingUPI = await prisma.upi.findFirst({
      where: {
        upi_id: upi_id,
      },
    });
    if (existingUPI) {
      throw new Error("UPI_ID already exists");
    }

    const createdUPI = await prisma.upi.create({
      data: {
        phone_number,
        upi_id
      },
    });

    return createdUPI;
  } catch (error) {
    throw new Error(error.message);
  }
}




async function getUPI() {
  try {
    const upi = await prisma.upi.findMany({
      where:{
        status:status.active
      }
    });
    return upi;
  } catch (error) {
    throw new Error(error.message);
  }
}


async function updateUPI(id, phone_number, upi_id,status) {
  try {
    const _id=parseInt(id)
    if(!mobileNumberRegex.test(phone_number)){
      throw new Error("Invalid phone number format");
    }
    if (!upi_id.includes("@")) {
      throw new Error("Please include '@' symbol in upi_id");
    } 
       const existingUPI = await prisma.upi.findFirst({
      where: {
        upi_id: upi_id,
      },
    });
    if (existingUPI) {
      throw new Error("UPI_ID already exists");
    }
    const updatedUPI = await prisma.upi.update({
      where: {
        id:_id,
        status:status.active
      },
      data: {
        phone_number,
        upi_id,
        status
      },
    });
    return updatedUPI;
  } catch (error) {
    throw new Error(error.message);
  }
}



async function deactivateUPI(id) {
  try {
    const _id=parseInt(id)
    const deletedUPI = await prisma.upi.update({
      where: {
        id:_id
      },
      data:{
        status:status.inactive
      }
    })
    return {deletedUPI};
  } catch (error) {
    throw new Error(error.message);
  }
}



async function getAllInactiveUpi() {
  try {
    const inactiveupi = await prisma.upi.findMany({
      where: {
        status: status.inactive,
      },
    });
    return inactiveupi;
  } catch (error) {
    console.error('Error retrieving inactive upi:', error);
    throw new Error('Internal Server Error');
  }
}



async function deleteUpi(id) {
  try {
    const _id=parseInt(id)
  const deletedUpi = await prisma.upi.delete({
    where: {
      id: _id,
    }
  });
  return deletedUpi;
} catch (error) {
  throw new Error(error.message);

}
}





module.exports = {
  createUPI,
  getUPI,
  updateUPI,
  deactivateUPI,
  deleteUpi,
  getAllInactiveUpi,
};
 