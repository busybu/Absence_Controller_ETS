const database = require('./src/config/db')
const express = require('express');

const routes = require('./routes');

const bodyParser = require('body-parser');

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', './src/views');
app.use(routes);
app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));