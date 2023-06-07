const JWT_SECRET = process.env.STAND === 'production' ? process.env.JWT_SECRET : 'dev';
const MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost:27017/mestodb';
const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
};

module.exports = {
  JWT_SECRET, APP_PORT, MONGO_OPTIONS, MONGO_DB,
};
