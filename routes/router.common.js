const { getUserById } = require("../database/users")

const requiresAdmin = async (req, res, next) => {
  try {
    if ("jwtUser" in req) {
      if ("id" in req.jwtUser) {
        const user = await getUserById(req.jwtUser.id);
        if (user.role === 0) {
          next();
          return;
        }
      }
    }
  } catch (err)  {
    console.log(err);
  }
  
  res.status(200).json({
    code: "common/requires-admin-error",
    message: "You cannot call this API with your role.",
  });
}

module.exports = {
  requiresAdmin,
}