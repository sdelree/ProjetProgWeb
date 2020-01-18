const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const server = express();
const port = process.env.PORT || 3000;

const root = path.join(__dirname, '..', 'dist', 'wheretopark');

server.use(compression());

server.get('/*', (req, res) => {
  const filename = req.baseUrl.replace('/', '') + req.path;
  const absoluteName = path.join(root, filename);
  console.log(absoluteName);
  if (fs.existsSync(absoluteName)) {
    console.log('exists');
    res.sendFile(absoluteName);
  } else {
    res.sendFile(path.join(root, 'index.html'));
  }
});

server.listen(port, () => {
  console.log('WhereToPark angular app up');
});
