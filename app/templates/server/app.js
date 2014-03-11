var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));

http.createServer(app).listen(3000);
