var jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
    // console.log('token',token)
  if (token) {
    const decoded_token = jwt.verify(token, "masai");
    console.log(req.body.userId);
    if (decoded_token) {
      const userId = decoded_token.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Login First to continue");
  }
};

module.exports = { authenticate };
