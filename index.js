const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

//mongodb
mongoose.connect(process.env.API_URL)
  .then(() => console.log("Connected to the db (●'◡'●)"))
  .catch(() => console.log("Couldn't connect to db (╯°□°）╯︵ ┻━┻"))

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/topic', require('./routes/topic'));

//port
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Serving running (☞ﾟヮﾟ)☞");
});