const express = require('express');
const people = require('./people.json');

const app = express();

app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));
// ...

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Inspiration',
    people: people.profiles
  });
});

app.get('/profile', (req, res) => {
  var resid = req.query.id;
  const person = people.profiles.find(p => p.id === resid.substring(0,2));
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    person
  });
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
