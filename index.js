const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const genre = require('./routes/genre');
const app = express();
const logger = require('./logging');
const home = require('./routes/home');

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('Public'));
app.use(helmet());
app.use('/api/genres/',genre);
app.use('/',home);

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));