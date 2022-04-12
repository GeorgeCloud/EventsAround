const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateJWT(user) {
  const mpJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

  return mpJWT
}

module.exports = function (app, models) {
  app.get('/signin', (req, res) => {
    res.render('signin')
  });

  app.post('/signin', (req, res, next) => {
    models.User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          req.session.sessionFlash = {
            type: 'warning',
            message:
              'Incorrect password.',
          };
          return res.redirect('/signin');
        }
        const mpJWT = generateJWT(user);
        res.cookie('mpJWT', mpJWT);
        res.redirect('/');
      });
    })
    .catch((err) => {
      console.log(err);
      req.session.sessionFlash = {
        type: 'warning',
        message:
          'No account with that username',
      };
      return res.redirect('/signin');
    });
  });

  app.get('/signup', (req, res) => {
    res.render('signup')
  });

  app.post('/signup', (req, res) => {
    models.User.create(req.body)
      .then((user) => {
        console.log(user)
        const mpJWT = generateJWT(user);
        res.cookie('mpJWT', mpJWT);
        req.session.sessionFlash = {
          type: 'success',
          message: 'Successfully created an account',
        };
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get('/logout', (req, res) => {
    res.clearCookie('mpJWT');
    res.redirect('/')
  });
}
