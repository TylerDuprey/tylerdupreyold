const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

app.use(express.static('public'));

app.use(function forceNoWs(req, res, next) {
  var host = req.get('Host');

  const hasWWW = host.match(/https?:\/\/www/g).length;

  console.log(hasWWW);

  return next();
});

app.get('/', (req, res) => {
    res.send('Served Static Files');
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
