const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const port = 3000;
const app = express();
const models = require('./db/models');
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    res.render('index', { events: events });
  })
})

app.get('/events/new', (req, res) => {
    res.render('events_new')
})

app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/events/${event.id}`);
  }).catch((err) => {
    console.log(err)
  });
})

app.get('/events/:id', (req, res) => {
  event_id = req.params.id
  models.Event.findByPk(id=event_id).then(event => {
    res.render('events_show', {event: event})
  })
});

app.get('/events/:id', (req, res) => {
  event_id = req.params.id
  models.Event.findByPk(id=event_id).then(event => {
    res.render('events_show', {event: event})
  })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}}!`)
})
