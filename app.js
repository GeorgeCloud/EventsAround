const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')

const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const port = process.env.PORT || 3000;
const app = express();
const models = require('./db/models')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.set("views", "./views");

require('./controllers/events')(app, models)

app.listen(port, () => {
  console.log(`App listening on port ${port}}!`)
})
