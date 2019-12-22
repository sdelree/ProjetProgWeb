const express = require('express');
const compression = require('compression');
const cors = require('cors');
const rootRouter = require('./routes/index');
const app = express();
const port = 3000;

app.use(compression());

app.use(cors());

app.use('/', rootRouter);


app.listen(port, () => console.log(`WhereToPark serve listening on port ${3000}`));
