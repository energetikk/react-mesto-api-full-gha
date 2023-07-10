const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
// const auth = (req, res, next) => {
//   let token;
//   try {
//     token = req.cookies.jwt;
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }
//   let payload;

//   try {
//     payload = jwt.verify(token, 'secret_phrase');
//     // console.log(payload);
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }
//   req.user = payload;
//   next();
// };
// module.exports = auth;
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret_phrase');
  } catch (err) {
    next(new UnauthorizedError('Авторизуйтесь на сайте'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
