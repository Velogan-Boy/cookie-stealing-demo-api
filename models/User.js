const prisma = require('../prisma/prisma');

const getUser = async (email) => {
   try {
      const user = await prisma.users.findUnique({
         where: {
            email: email,
         },
         select: {
            id: true,
            email: true,
            password: true,
         },
      });

      if (!user) {
         return { user: { id: 0 }, err: null };
      }

      return { user, err: null };
   } catch (err) {
      console.log(err);
      return { user: null, err: err };
   }
};

const createUser = async (user) => {
   let result, userId;

   try {
      result = await prisma.users.create({
         data: { email: user.email, password: user.pass },
      });
      userId = result.id;

      return { userID: userId, err: null };
   } catch (err) {
      return { userID: null, err: err };
   }
};

module.exports = {
   getUser,
   createUser,
};
