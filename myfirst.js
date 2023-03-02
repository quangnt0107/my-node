const http = require('http');
const url = require('url');
const dt = require('./myfirstmodule');


http.createServer((req, res) => {
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;

  res.writeHead(200, {'Content-type': 'text/html'});
  res.write(`the date and time are: ${dt.myDateTime()}, ${req.url}\n`)
  res.end(txt);
}).listen(8080);
