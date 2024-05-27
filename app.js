require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes');
const cookieParser = require('cookie-parser');

// app.use(cors({
//   origin: process.env.FRONTEND_HOST,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`App listen on http://localhost:${process.env.PORT}`);
});