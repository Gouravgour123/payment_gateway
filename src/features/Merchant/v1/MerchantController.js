const  merchantService = require('./MerchantService')
/**
 * @swagger
 * /api/merchant/v1/create:
 *   post:
 *     summary: new merchant will be created 
 *     description: new merchant will be created 
 *     tags:
 *       - Merchant
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               platform_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: merchant created successfully
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
 *                     created_collection:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *                         platform_name:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
exports.createMerchantController = async (req, res) =>{
  try {
    const {
      name,
      email,
      password,
      platform_name,
    } = req.body;
    const _response = await merchantService.createMerchant(name, email, password, platform_name);
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
            message: "Merchant created successfully",
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
}


/**
 * @swagger
 * /api/merchant/v1/merchant-login:
 *   post:
 *     summary: merchant_login
 *     description: Login a merchant using email and password
 *     tags:
 *       - Merchant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authorized merchant logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 */
exports.loginSync = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const _response = await merchantService.loginMerchant(email, password);
    if (_response instanceof Error) {
      res.status(500).send({
        status: false,
        error: { message: _response.message },
      });
    } else {
      res.status(200).send({
        status: true,
        data: { token: _response.token, message: `${_response.message}` },
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
 * /api/merchant/v1/list:
 *   get:
 *     summary: Retrieve all available merchant info 
 *     description: Retrieve all available merchant info 
 *     tags:
 *      - Merchant
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All available merchant Info.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
  *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               platform_name:
 *                 type: string
 *               web_url:
 *                  type: string
 *               redirected_url:
 *                   type: string
 *               webhooks_url:
 *                   type: string
 *               secret_key:
 *                   type:string
 *               secret_IV:
 *                   type:string
 *               status:
 *                   type: string
 */
exports.getMerchant =  async (req, res) => {
  try {
    const _response = await merchantService.getMerchant();
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          merchant: _response,
          message: `${_response.length} merchant fetched successfully`,
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
 * /api/merchant/v1/update/{id}:
 *   put:
 *     summary: Admin can update merchant data
 *     description: Update a merchant's details by providing its ID
 *     tags:
 *       - Merchant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the merchant to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               platform_name:
 *                 type: string
 *               web_url:
 *                  type: string
 *               redirected_url:
 *                   type: string
 *               webhooks_url:
 *                   type: string
 *               status:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Merchant updated successfully
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
 *                     update_merchant:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *                         platform_name:
 *                           type: string
 *                         
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
exports.updateMerchant =  async (req, res) => {
  try {
    const {id} = req.params;
    const { 
      name,
      email, 
      password,
       platform_name,
       web_url, 
        redirected_url, 
        webhooks_url,
        status
      } = req.body;
    const _response = await merchantService.updateMerchant(
      id, 
      name,
      email, 
      password,
       platform_name, 
       web_url,
       redirected_url,
       webhooks_url,
       status,
       res
       );
    if (_response instanceof Error) {
      res.status(400).send({
        status: false,
        data: {},
        error: { message: _response.message },
      });
    } else {
      res.status(200).send({
        status: true,
        data: {
          merchant: _response,
          message: `Merchant  updated successfully`,
        },
        error: {},
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, data: {}, error: { message: 'Internal server error' } });
  }
};



/**
 * @swagger
 * /api/merchant/v1/update-Secret/{id}:
 *   put:
 *     summary: admin can update Secret_key and IV
 *     description: Update a Secret's details by providing its ID
 *     tags:
 *       - Merchant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Secret to update
 *     responses:
 *       200:
 *         description: Secret_ket and IV updated successfully
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
 *                     update_merchant:
 *                       type: object
 *                       properties:
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

exports.updateSecretKeys =  async (req, res) => {
  try {
    const {id} = req.params;
    const _response = await merchantService.updateSecret(
      id
      );
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
          Secret: `here is new secret_key:${_response.secret_key}  && secret_IV:${_response.secret_IV}`,
          message: `Secret updated successfully`,
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
 * /api/merchant/v1/trash-list:
 *   get:
 *     summary: Retrieve all inactive merchants
 *     description: Retrieve all inactive merchants
 *     tags:
 *      - Merchant
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inactive merchant.
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

exports.getAllInactiveMerchant = async (req, res)=> {
  try {
    const inactiveMerchant = await merchantService.getAllInactiveMerchant();
    if (inactiveMerchant instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          inactiveMerchant: inactiveMerchant,
          message: `deactivated Merchant info fetched successfully`,
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
 * /api/merchant/v1/soft-delete/{id}:
 *   delete:
 *     summary: merchant can be deleted 
 *     description: inactive a merchant by providing its ID
 *     tags:
 *       - Merchant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the merchant to delete
 *     responses:
 *       200:
 *         description: merchant deactivate successfully
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
 *                     deactivate_merchant:
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

exports.deactivateMerchant = async(req, res) => {
  try {
  const { id } = req.params;
    const _response = await merchantService.deactivate_merchant(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_upi: _response,
          message: ` merchant  deactivated successfully`,
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
 * /api/merchant/v1/trash-list:
 *   get:
 *     summary: Retrieve all inactive merchants
 *     description: Retrieve all inactive merchants
 *     tags:
 *      - Merchant
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inactive merchant.
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

exports.getAllInactiveMerchant = async (req, res)=> {
  try {
    const inactiveMerchant = await merchantService.getAllInactiveMerchant();
    if (inactiveMerchant instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          inactiveMerchant: inactiveMerchant,
          message: `all   deactivated merchant fetched  successfully`,
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
 * /api/merchant/v1/delete/{id}:
 *   delete:
 *     summary: merchant can be deleted
 *     description: delete a merchaent providing its ID
 *     tags:
 *       - Merchant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the merchant to delete
 *     responses:
 *       200:
 *         description: merchant deleted successfully
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
 *                     delete_merchant:
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
exports.deleteMerchant =  async (req, res) => {
  try {
    const { id } = req.params;
    const _response = await merchantService.deleteMerchant(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_merchant: _response,
          message: ` Merchant  deleted successfully`,
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



// exports.payRequest = async (req, res) => {
//   try {
//     const { Data } = req.body;
//     const _response = await merchantService.verifyPayRequest(Data);
//     if (_response instanceof Error) {
//       res.status(500).send({
//         status: false,
//         data: {},
//         error: { message: _response.message },
//       });
//     } else {
//       res.status(200).send({
//         status: true,
//         data: {
//           UIID: _response,
//           message: `pay request created sucessfully`,
//         },
//         error: {},
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, data: {}, error: { message: error } });
//   }
// };

// exports.upi_ID = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const _response = await merchantService.UPI(id);
//     if (_response instanceof Error) {
//       res.status(500).send({
//         status: false,
//         data: {},
//         error: { message: _response.message },
//       });
//     } else {
//       res.status(200).send({
//         status: true,
//         data: {
//           UPI_ID: _response,
//           message:  `UPI ID send sucessfully`,
//         },
//         error: {},
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, data: {}, error: { message: error } });
//   }
// };

// exports.after_payment_info = async (req, res) => {
//   try {
//     const{id}=req.params
//     const { utr } = req.body;
//     console.log(utr,id)
//    const _response = await merchantService.after_payment_info(utr,id);
//     if (_response instanceof Error) {
//       res.status(500).send({
//         status: false,
//         data: {},
//         error: { message: _response.message },
//       });
//     } else {
//       res.status(200).send({
//         status: true,
//         data: {
//           UIID: _response,
//           message: `payment info recivied`,
//         },
//         error: {},
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, data: {}, error: { message: error } });
//   }
// };


/**
 * @swagger
 * /api/merchant/v1/change-password:
 *   post:
 *     summary: merchant can update his password
 *     description: merchant can update his password
 *     tags:
 *       - Merchant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: merchant created successfully
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
 *                     created_collection:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *                         platform_name:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

exports.changePassword = async (req, res) =>{
  try {
    const {
      oldPassword,
      newPassword
    } = req.body;
    const _response = await merchantService.changePassword(req.user.id, oldPassword, newPassword);
    if (_response instanceof Error) {
        res.status(500).send({
          status: false,
          data: {},
          error: { message: _response },
        });
      } else {
        res.status(200).send({
          status: true,
          data: {
            message: "Merchant password updated successfully",
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
}



// exports.withdrwRequest = async (req, res) => {
//   try {
//     const { Data } = req.body;
//     const _response = await merchantService.verifywithdrwRequest(Data);
//     if (_response instanceof Error) {
//       res.status(500).send({
//         status: false,
//         data: {},
//         error: { message: _response.message },
//       });
//     } else {
//       res.status(200).send({
//         status: true,
//         data: {
//           URL: _response,
//           message: `withdrawal request created sucessfully`,
//         },
//         error: {},
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, data: {}, error: { message: error } });
//   }
// };