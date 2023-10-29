const { HTTPError } = require("../utils/");

const validationMiddleware = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(schema.validate(req.body));
    if (error) {
      next(HTTPError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validationMiddleware;
