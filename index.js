const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
