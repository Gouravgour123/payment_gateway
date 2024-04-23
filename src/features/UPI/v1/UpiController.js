const upiService = require("./UPiService");


/**
 * @swagger
 * /api/upi/v1/create:
 *   post:
 *     summary: admin can create new upi
 *     description: create a new upi with provided data
 *     tags:
 *       - UPI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *               upi_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Upi created successfully
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
 *                     created_upi:
 *                       type: object
 *                       properties:
 *                         phone_number:
 *                           type: string
 *                         upi_id:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
exports.createUPI = async(req, res) =>{
  try {
    const { phone_number, upi_id } = req.body;
    const _response = await upiService.createUPI(phone_number, upi_id);

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
          upi: _response,
          message: "Upi created successfully",
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
 * /api/upi/v1/list:
 *   get:
 *     summary: Retrieve all available upi info 
 *     description: Retrieve all availableupi info 
 *     tags:
 *      - UPI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All available UPI Info.
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
exports.getUPI = async(req, res) =>{
  try {
    const _response = await upiService.getUPI();
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          upiInfo: _response,
          message: `${_response.length} upi info fetched successfully`,
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
 * /api/upi/v1/update/{id}:
 *   put:
 *     summary: admin can update upi
 *     description: Update a upi's details by providing its ID
 *     tags:
 *       - UPI
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the upi to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *               upi_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: upi updated successfully
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
 *                     update_upi:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         phone_number:
 *                           type: string
 *                         upi_id:
 *                           type: string
 *                     message:
 *                       type: string
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

exports.updateUPI = async(req, res) =>{
  try {
  const { id } = req.params;
  const { phone_number, upi_id,status} = req.body;
    const _response = await upiService.updateUPI(id, phone_number, upi_id,status,res);
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
          upi: _response,
          message: `upi updated successfully`,
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
 * /api/upi/v1/trash-list:
 *   get:
 *     summary: Retrieve all inactive upi info 
 *     description: Retrieve all inactive upi info 
 *     tags:
 *      - UPI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inactive UPI Info.
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
exports.getAllInactiveUpi = async (req, res)=> {
  try {
    const inactiveUpi = await upiService.getAllInactiveUpi();
    if (inactiveUpi instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          inactiveUpi: inactiveUpi,
          message: `deactivated UPI's info fetched successfully `,
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
 * /api/upi/v1/soft-delete/{id}:
 *   delete:
 *     summary: upi can be deactivated 
 *     description: inactive a upi by providing its ID
 *     tags:
 *       - UPI
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the upi to inactive
 *     responses:
 *       200:
 *         description: upi inactive successfully
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
 *                     inactive_upi:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
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

exports.deactivate_UPI = async(req, res) => {
  try {
  const { id } = req.params;
    const _response = await upiService.deactivateUPI(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_upi: _response,
          message: ` upi  deactivated successfully`,
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
 * /api/upi/v1/delete/{id}:
 *   delete:
 *     summary: upi can be deleted
 *     description: delete a upi providing its ID
 *     tags:
 *       - UPI
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the upi to delete
 *     responses:
 *       200:
 *         description: upi deleted successfully
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
exports.deleteUpi =  async (req, res) => {
  try {
    const { id } = req.params;
    const _response = await upiService.deleteUpi(id);
    if (_response instanceof Error) {
    } else {
      res.status(200).send({
        status: true,
        data: {
          delete_merchant: _response,
          message: ` upi  deleted successfully`,
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