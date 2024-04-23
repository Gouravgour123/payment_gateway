
const { status } = require('@prisma/client');
const bankService = require('./Bank_accountService');



/**
 * @swagger
 * /api/bank-account/v1/create:
 *   post:
 *     summary: create new bank_account
 *     description: create a new bank_account with provided data
 *     tags:
 *       - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               account_number:
 *                 type: string
 *               confirm_account_number:
 *                 type: string
 *               ifsc:
 *                  type: string
 *     responses:
 *       200:
 *         description: Bank_Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     created_bank_account:
 *                       type: object
 *                       properties:
 *                         id: 
 *                           type: number
 *                         name:
 *                           type: string
 *                         bank_name:
 *                           type: string
 *                         phone_number:
 *                           type: string
 *                         account_number:
 *                           type: string
 *                         ifsc:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

exports.createBankAccount =  async (req, res) => {
  try {
    const { name,bank_name,phone_number, account_number, confirm_account_number,ifsc } = req.body;
    const _response = await bankService.createBankAccount(name,bank_name,phone_number, account_number, confirm_account_number,ifsc);
      
    if (_response instanceof Error) {
      res.status(500).send({
        status: false,
        data: {},
        error: { message: _response.message },
      });
    } else {
      res.status(200).send({
        status: true,
        data: {
          account_number: _response,
          message: "BankAccount created successfully",
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error.message } });
  }
};




/**
 * @swagger
 * /api/bank-account/v1/list:
 *   get:
 *     summary: Retrieve all available bankaccount
 *     description: Retrieve all available bankaccount
 *     tags:
 *      - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All available Bank_Accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */
exports.getBankAccount =  async (req, res) => {
  try {
    const _response = await bankService.getBankAccount();
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          account_number: _response,
          message: `${_response.length} BankAccount fetched successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error } });
  }
};



/**
 * @swagger
 * /api/bank-account/v1/update/{id}:
 *   put:
 *     summary: update bank_account
 *     description: Update a bank_account's details by providing its ID
 *     tags:
 *       - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the bank_account to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *               status:
 *                  type: string
 *     responses:
 *       200:
 *         description: Bank_account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     update_bankaccount:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         account_number:
 *                           type: string
 *                         ifsc:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

const mobileNumberRegex = /^\+91\s?[6-9]\d{9}$/;
exports.updateBankAccount =  async (req, res) => {
  try {
    const {id} = req.params;
    const { name,phone_number,status} = req.body;
    if(phone_number){
      if(!mobileNumberRegex.test(phone_number)){
       return res.status(400).send({
          error:"Invalid phone number format"
        })
      }
    }
    const _response = await bankService.updateBankAccount(id, name,phone_number,status,res);
    if (_response instanceof Error) {
      res.status(500).send({
        status: false,
        data: {},
        error: { message: _response.message },
      });
    } else {
      res.status(200).send({
        status: true,
        data: {
          account_number: _response,
          message: `BankAccount updated successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error } });
  }
};


/**
 * @swagger
 * /api/bank-account/v1/trash-list:
 *   get:
 *     summary: Retrieve all inactive bankaccount
 *     description: Retrieve all inactive bankaccount
 *     tags:
 *      - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inactive Bank_Accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */

exports.getInactiveBankAccounts = async (req, res)=> {
  try {
    const inactiveAccounts = await bankService.getAllInactiveBankAccounts();
    if (inactiveAccounts instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          inactiveAccounts: inactiveAccounts,
          message: `deactivated Bank_Account's info fetched successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error } });
  }
}

/**
 * @swagger
 * /api/bank-account/v1/soft-delete/{id}:
 *   delete:
 *     summary: Bank_account can be deactivated 
 *     description: inactive a merchant by providing its ID
 *     tags:
 *       - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Bank_account to deactivate
 *     responses:
 *       200:
 *         description: Bank_account deactivate successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     deactivate_Bank_account:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

exports.deactivate_Bank_Account = async(req, res) => {
  try {
  const { id } = req.params;
    const _response = await bankService.deactivate_Bank_Account(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_upi: _response,
          message: ` bank_account  deactivated successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error } });
  }
}


/**
 * @swagger
 * /api/bank-account/v1/delete/{id}:
 *   delete:
 *     summary: bank_account can be deleted
 *     description: inactive a bank_account by providing its ID
 *     tags:
 *       - Bank_Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bank_account to delete
 *     responses:
 *       200:
 *         description: bank_account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     delete_upi:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
exports.deleteBankAccount =  async (req, res) => {
  try {
    const { id } = req.params;
    const _response = await bankService.deleteBankAccount(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_bankaccount: _response,
          message: ` BankAccount  deleted successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: error } });
  }
};