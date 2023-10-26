const { verifyJWT } = require('../services/jwtAuth');

const tokenAuth = async (req, res, next) => {
   let token = req.headers['tokenstring'];

   if (!token) {
      return res.status(400).json({
         message: 'Token not found',
         isExpired: true,
      });
   }

   let result = verifyJWT(token);

   if (!result) {
      return res.status(400).json({
         message: 'Invalid token',
         isExpired: true,
      });
   }

   console.log(result)

   next();
};

module.exports = tokenAuth;
