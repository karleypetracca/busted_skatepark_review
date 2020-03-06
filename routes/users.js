const express = require('express'),
  bcrypt = require('bcryptjs'),
  UserModel = require('../models/users'),
  router = express.Router();

router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Sign Up'
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Login'
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;
  const user = new UserModel(null, null, null, email, password);
  const loginResponse = user.loginUser();
  if (loginResponse === true) {
    res.status(200).redirect('/');
  } else {
    res.status(403).redirect('/users/login');
  };
});

router.post('/signup', async function(req, res, next) {
  const { first_name, last_name, password, email } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await new UserModel(null, first_name, last_name, email, hash);
  user.addUser();
  res.status(200).redirect('/');
});

module.exports = router;
