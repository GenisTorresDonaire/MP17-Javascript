var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var listado = require('./routes/listado.js');
var wiki = require('./routes/wiki.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('/', index);
app.use('/users', users);
app.use('/listado', listado);
app.use('/wiki', wiki);
*/

var router = express.Router();
app.use('/', router);

router.get('/', index);

router.get('/about', function(req, res) {
  res.send('im the about page!'); 
});


// --------------------------------------------- Listado --------------------------------------------- //

router.get('/listado', function(req, res) {
  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("AppMusica");

    // Per no mostrar totes les pelis, restringim ...
    dbo.collection("canciones").find({}).toArray(function(err, result) {

      // Si existeix un error, es llença una "exception" 
      if (err) throw err;

      // A la variable "result" es guarda l'array d'items que hem obtingut. Podem iterar-les fent un bucle ("loop").
      result.forEach(function(cancion) {
        //console.log(JSON.stringify({"titulo" : cancion.titulo, "autor" : cancion.autor, "año" : cancion.año}));
        res.send(JSON({"titulo" : cancion.titulo, "autor" : cancion.autor, "año" : cancion.año});
      });

      // Tenquem la base de dades! (important!)
      db.close();
    });

  });
});




// --------------------------------------------- ERRORES --------------------------------------------- //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






