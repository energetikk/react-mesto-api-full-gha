const {
  JWT_SECRET,
  NODE_ENV,
  // MONGO_DB = 'mongodb://127.0.0.1/mestodb',
  MONGO_DB = 'mongodb://mongo:27017/mestodb',
  PORT = 8000,
} = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  MONGO_DB,
};
