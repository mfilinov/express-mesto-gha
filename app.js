const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const mongo = 'mongodb://localhost:27017/mestodb';
const mongoOptions = {
  useNewUrlParser: true,
};
const app = express();

app.use(express.json());

mongoose.connect(mongo, mongoOptions);

app.use((req, res, next) => {
  req.user = {
    _id: '647858985bc3ef0c75b0cdb7',
  };
  next();
});
app.use(router);

app.listen(PORT, () => console.log(`App started on the port ${PORT}`));
