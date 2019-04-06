var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Подключаемся к базе данных
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://vladpivovarov2797:063vladislav@ds149954.mlab.com:49954/remember", {user: "", pass: "", useNewUrlParser: true})
	.catch(function(e) {
		console.error(e);
	});

require("./models/message");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/")));


app.use('/', require('./routers/index'));
app.use('/about', require('./routers/about'));
app.use('/message', require('./routers/message'));


app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.render('500');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});