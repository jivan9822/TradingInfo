// const { setUserAuth } = require('../Middleware/RedisHandler-block');
const User = require('../Models/UserModel');
const AppError = require('../Utils/AppError');
const { CatchAsync } = require('../Utils/CatchAsync');
const { sign } = require('jsonwebtoken');

exports.userRegistration = CatchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  if (!user) {
    return next(new AppError('User creation failed!', 400));
  }
  res.status(201).json({
    status: true,
    message: 'User creation success!',
    user,
  });
});

exports.userAuth = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body.data;
  if (!email || !password) {
    return next(new AppError('Invalid input', 404));
  }
  const user = await User.findOne({ email }).select('+password');
  if (await !user.comparePass(password, user.password)) {
    return next(new AppError('Incorrect password! Please try again!', 400));
  }
  const token = sign({ id: user._id }, process.env.JWT_SEC_STRING);
  req.token = token;
  user.password = undefined;
  req.user = user;
  // setUserAuth(user._id, user); // catch

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({
    status: true,
    message: 'Login success!',
    data: {
      token: req.token,
      user: req.user,
    },
  });
});

exports.isLogin = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'User verification success!',
    data: {
      user: req.user,
    },
  });
});

exports.userLogOut = CatchAsync(async (req, res, next) => {
  // setUserAuth(req.user._id, null); // catch
  res.cookie('jwt', null);
  res.status(200).json({
    status: true,
    message: 'LogOut Success!',
  });
});
