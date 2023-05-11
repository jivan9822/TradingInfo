const AppError = require('../Utils/AppError');
const { CatchAsync } = require('../Utils/CatchAsync');
const { promisify } = require('util');
const { verify } = require('jsonwebtoken');
const { getUserAuth } = require('./RedisHandler');

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('You are not logged in! Please login...', 403));
  }
  const decode = await promisify(verify)(token, process.env.JWT_SEC_STRING);
  const user = await getUserAuth(decode.id);
  if (!user) {
    return next(new AppError('Session time-out!! Please login again!', 401));
  }
  req.user = user;
  next();
});
