const {loginAdmin} = require('./AdminService');

/**
 * @swagger
 * /api/Admin/v1/admin-login:
 *   post:
 *     summary: admin_login
 *     description: Login a user using email and password
 *     tags:
 *       - Admin
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
 *         description: Authorized user logged in successfully
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
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 */
exports.loginSync = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const _response = await loginAdmin(email, password);
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