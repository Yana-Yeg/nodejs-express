const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      phone: Joi.string().phoneNumber().required(),
    });

    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(404).json({ status: validResult.error.details });
    }

    next();
  },

  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .optional(),
      phone: Joi.string().phoneNumber().optional(),
    });

    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(404).json({ status: validResult.error.details });
    }

    next();
  },
};
