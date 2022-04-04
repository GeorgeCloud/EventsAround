module.exports = function (app, models) {

  app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('index', { events: events });
    });
  });
}
