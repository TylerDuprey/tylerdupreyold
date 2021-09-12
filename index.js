const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(function (req, res, next) {
  res.status(404).send("404 Error. Sorry can't find that!")
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
