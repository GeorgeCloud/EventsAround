const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')

const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const port = 3000;
const app = express();
const models = require('./db/models')
require('./controllers/events')(app, models)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.set("views", "./views");

// app.get('/', (req, res) => {
//   models.Event.findByPk(id=4).then(event => {
//     event.destroy();
//   })
//   res.send('1')
// })

app.get('/events/new', (req, res) => {
    res.render('events_new')
})

// Create
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/events/${event.id}`);
  }).catch((err) => {
    console.log(err);
  });
})

app.get('/events/:id', (req, res) => {
  event_id = req.params.id
  models.Event.findByPk(id=event_id).then(event => {
    res.render('events_show', {event: event});
  })
});

// UPDATE
app.put('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.update(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.delete('/events/:id', (req, res) => {
  event_id = req.params.id;
  models.Event.findByPk(id=event_id).then(event => {
    event.destroy();
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/events/:id/edit', (req, res) => {
  event_id = req.params.id
  models.Event.findByPk(id=event_id).then(event => {
    res.render('events_edit', {event: event})
  })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}}!`)
})
