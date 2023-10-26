const joi = require('joi');

const validateRegisterUser = (req, res, next) => {
   const registerUserSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).max(20).required(),
   });

   const { error } = registerUserSchema.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   next();
};

module.exports = {
   validateRegisterUser,
};
