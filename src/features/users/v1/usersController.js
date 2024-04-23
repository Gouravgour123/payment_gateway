const {
    createUser,
    loginUser
  } = require("./usersService");
  
  /**
   * @swagger
   * /api/user/v1/signup:
   *   post:
   *     summary: signup
   *     description: Create a new user with the provided information functionality user can signUp
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               full_name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               mobile_number:
   *                 type: string
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: User Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 first_name:
   *                   type: string
   *                 last_name:
   *                   type: string
   *                 email:
   *                   type: string
   */
  
  exports.signupSync = async (req, res, next) => {
    try {
      const { full_name, email, mobile_number, password } = req.body;
      const _response = await createUser(
        full_name,
        email,
        mobile_number,
        password
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
   * /api/user/v1/login:
   *   post:
   *     summary: login
   *     description: Login a user using email and password
   *     tags:
   *       - User
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
      const _response = await loginUser(email, password);
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