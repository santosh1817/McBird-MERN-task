const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { authenticateUser } = require('../middleware/authentication');

// localhost:3005/users/allusers
router.get('/allusers', authenticateUser, (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post('/register', (req, res) => {
  const body = req.body;
  const user = new User(body);

  console.log(body);
  user
    .save()
    .then(user => res.send(user))
    .catch(err => res.send(err));
});
router.post('/login', (req, res) => {
  const body = req.body;
  User.findByCredentials(body.email, body.password)

    .then(user => {
      return user.generateToken();
    })
    .then(token => {
      console.log(token);
      res.send({ token });
    })
    .catch(err => {
      res.send(err);
    });
});

router.put('/edit/:id', authenticateUser, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/account', authenticateUser, (req, res) => {
  const { user } = req;
  res.send(user);
});
router.delete('/logout', authenticateUser, function(req, res) {
  const { user, token } = req;

  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function(user) {
      res.send({ notice: 'successfully logout...' });
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = {
  usersRouter: router
};
