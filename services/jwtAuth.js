const jwt = require('jsonwebtoken');

const createJWT = (email) => {
   var token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      algorithm: process.env.SIGNING_ALGO,
   });

   return token;
};

const verifyJWT = (token) => {
   let decoded;
   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
      return null;
   }
   return decoded;
};

module.exports = {
   createJWT,
   verifyJWT,
};
