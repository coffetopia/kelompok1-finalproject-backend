require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`App listen on http://localhost:${process.env.PORT}`);
});