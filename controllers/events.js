module.exports = function (app, models) {

  app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('index', {events: events});
    });
  });

  app.get('/events/new', (req, res) => {
      res.render('events_new')
  })

  // Create
  app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      console.log(req.body)
      res.redirect(`/events/${event.id}`);
    }).catch((err) => {
      console.log(err);
    });
  })

  // Event Detail
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
}
