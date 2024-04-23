const {
    upsertRawMessage,
} = require("./RawMessageService");

exports.createRawMessage = async (req, res, next) => {
    try {
      
      const { sender, message} = req.body;
      const _response = await upsertRawMessage({sender,message});
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
            collection: _response,
            message: "Raw Message created successfully",
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