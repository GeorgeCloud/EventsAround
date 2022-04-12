const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const port = process.env.PORT || 3000;
const app = express();
const models = require('./db/models')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser('SECRET'))
const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 60);

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.use(function authenticateToken(req, res, next) {
  const token = req.cookies.mpJWT;

  if (token) {
    const user = jwt.verify(token, 'AUTH-SECRET');
    if (user.id) {
      models.User.findByPk(user.id).then(
        (user) => {
          res.locals.currentUser = user;
          next();
        }
      ).catch(
        (err) => {
          console.log(err);
          next();
        }
      );
    }
  } else {
    next();
  }
});

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(session({
    secret: "SECRET_KEY",
    cookie: { expires: expiryDate },
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

require('./controllers/events')(app, models)
require('./controllers/rsvps')(app, models)
require('./controllers/auth')(app, models)

app.listen(port, () => {
  console.log(`App listening on port ${port}}!`)
})
