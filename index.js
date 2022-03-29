const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

var events = [
  {id: 0, title: 'street racing', description: 'full description is here.', owner_username: 'kiirb', imgUrl: 'https://i.giphy.com/media/X8M3OBHBLRWDWVaLYd/giphy.webp', created_on: '12/08/1998'},
  {id: 0, title: 'street racing', description: 'full description is here.', owner_username: 'kiirb', imgUrl: 'https://i.giphy.com/media/X8M3OBHBLRWDWVaLYd/giphy.webp', created_on: '12/08/1998'}
]

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");


app.get('/', (req, res) => {
  res.render('home', { events: events })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}}!`)
})
