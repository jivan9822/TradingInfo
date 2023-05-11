require('dotenv').config({ path: 'config.env' });
require('./Src/Middleware/Mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { globalErrorHandler } = require('./Src/Utils/globalErrorHandler');
const AppError = require('./Src/Utils/AppError');
const userRoute = require('./Src/Routes/UserRoute');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(multer().any());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://stockinfoapp.netlify.app'],
    credentials: true,
  })
);

app.use('/user', userRoute); // '/user/registration';

app.all('*', (req, res, next) => {
  return next(new AppError(`The ${req.originalUrl} not found in server!`, 400));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
