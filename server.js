const express = require('express');

const app = express();

app.use(express.static('./dist/cipher-frontend/'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/cipher-frontend/' }),
);

app.listen(process.env.PORT || 8080);
