const router = require('express').Router();
const { User } = require('../../db');

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = User.authenticate({ username, password });
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
