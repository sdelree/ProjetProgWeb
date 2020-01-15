const express = require('express');
const compression = require('compression');
const cors = require('cors');
const database = require('./database/connection');
const rootRouter = require('./routes/index');
const app = express();
const port = 3000;

app.use(compression());

app.use(cors());

app.use('/', rootRouter);


console.log('Running WheretoPark server...');
app.listen(port, () => {
  console.log(`WhereToPark serve listening on port ${3000}`);
  console.log('Connecting to MongoDB database...');
  database.connect()
    .then(_ => console.log('Connection successfull'))
    .catch(err => {
      console.error(`Connection failed. Cause : ${err}`);
      process.exit(1);
    })
});
