module.exports = function (app, models) {

  app.post('/rsvp', (req, res) => {
    // req.body.EventId = req.params.eventId;
    models.Rsvp.create(req.body).then(rsvp => {
      res.redirect(`/events/${event_id}`);
    }).catch((err) => {
      console.log(err);
    });
  });

  app.delete('/rsvp/:id', (req, res) => {
    rsvp_id = req.params.id;
    models.Rsvp.findByPk(id=rsvp_id).then(rsvp => {
      rsvp.destroy();
      res.redirect(req.headers.referer);
    }).catch((err) => {
      console.log(err);
    });
  });
}
