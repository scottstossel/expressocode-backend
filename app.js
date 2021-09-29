const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

//mongodb
mongoose.connect(process.env.API_URL)
  .then(() => console.log("Connected to the db (●'◡'●)"))
  .catch(() => console.log("Couldn't connect to db (╯°□°）╯︵ ┻━┻"))

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
  useTempFile: true,
  tempFileDir: '/tmp/',
  createParentPath: true
}));
app.use(morgan('dev'));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/topic', require('./routes/topic'));
app.use('/api/post', require('./routes/post'));


//port
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Serving running (☞ﾟヮﾟ)☞");
});