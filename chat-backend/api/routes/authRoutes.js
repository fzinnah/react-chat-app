const router = require('express').Router();
const { User } = require('../../db');
const { requireToken } = require('../authMiddleware');

router.get('/', requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log('backend issue getting user from auth');
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.authenticate({ email, password });
    if (token) {
      return res.status(200).send({ token });
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (error) {
    console.error('error message:', error);
  }
});

module.exports = router;
