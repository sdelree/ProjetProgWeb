const express = require('express');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const session = require('express-session');
const authentication = require('./middlewares/authentication');
const database = require('./database/connection');
const rootRouter = require('./routes/index');
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(session({
  secret: 'shhhhhhhThatsASecret',
  resave: false,
  saveUninitialized: false,
  cookie: {httpOnly: true},
  name: 'SessionID'
}));

app.use(bodyparser.json());

app.use(compression());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(authentication());

app.use('/', rootRouter);


console.log('Running WheretoPark server...');
app.listen(port, () => {
  console.log(`WhereToPark serve listening on port ${port}`);
  console.log('Connecting to MongoDB database...');
  database.connect()
    .then(_ => console.log('Connection successfull'))
    .catch(err => {
      console.error(`Connection failed. Cause : ${err}`);
      process.exit(1);
    })
});
