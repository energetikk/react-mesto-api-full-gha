const {
  JWT_SECRET,
  NODE_ENV,
  MONGO_DB = 'mongodb://127.0.0.1/mestodb',
  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  MONGO_DB,
};
