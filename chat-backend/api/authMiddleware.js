const { User } = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log('auth failed');
      return res.status(403).send('must be logged in to access');
    }
    const user = await User.verifyByToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log('error in requireToken middleware', error);
    next(error);
  }
};

module.exports = { requireToken };
