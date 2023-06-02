const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const mongo = 'mongodb://localhost:27017/mestodb';
const mongoOptions = {
  useNewUrlParser: true,
};
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongo, mongoOptions);

app.use((req, res, next) => {
  req.user = {
    _id: '647858985bc3ef0c75b0cdb7',
  };
  next();
});
app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.use('*', (req, res) => res.status(404).send({ message: 'Resource Not Found' }));

app.listen(PORT, () => console.log(`App started on the port ${PORT}`));
