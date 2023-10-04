const router = require('express').Router();
const { User } = require('../../db');

// register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    const [newUser, wasCreated] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        userName,
        password,
        email,
      },
      attributes: { exclude: ['password'] },
    });

    if (!wasCreated) return res.status(409).send('User already exists');

    res.status(201).send({
      token: await User.authenticate({ email, password }),
    });
  } catch (error) {
    console.error('backend issue registering user', error);
  }
});

// get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log('Backend issue fetching all users');
    next(error);
  }
});
// get a single user by ID
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    console.log('Backend issue fetching user');
    next(error);
  }
});

// update a user by ID
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      res.status(404).send('User not found');
    }
    await user.update(req.body);
    res.status(200).send(user);
  } catch (error) {
    console.log('Backend issue updating user');
    next(error);
  }
});

// delete a user by ID
router.delete('/:userId', async (req, res, next) => {
  try {
    const rowsDeleted = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    if (rowsDeleted > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log('backend issue deleting user');
    next(error);
  }
});

module.exports = router;
