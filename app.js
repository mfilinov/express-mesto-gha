const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { APP_PORT, MONGO_DB, MONGO_OPTIONS } = require('./utils/config');

const app = express();

app.use(cors());
app.use(rateLimit);
app.use(helmet());
app.use(express.json());

mongoose.connect(MONGO_DB, MONGO_OPTIONS);

app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`App started on the port ${APP_PORT}`));
