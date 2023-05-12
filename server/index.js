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

// Add function to set header for access control
app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to *
  res.header('Access-Control-Allow-Origin', '*');
  // Set the Access-Control-Allow-Headers header to Origin, X-Requested-With, Content-Type, Accept
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  // Call the next middleware function
  next();
});

// Add a cors middleware with the specified origins and credentials
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://stockinfoapp.netlify.app'],
    credentials: true,
  })
);

// Add a route for the /user endpoint
app.use('/user', userRoute);

// Add a catch-all route that returns an error if the requested route is not found
app.all('*', (req, res, next) => {
  // Create a new AppError object with the specified message and status code
  const error = new AppError(
    `The ${req.originalUrl} not found in server!`,
    400
  );
  // Return the error to the next middleware function
  return next(error);
});

// Add the global error handler
app.use(globalErrorHandler);

// Set the port number
const port = process.env.PORT || 5000;

// Listen for connections on the specified port
app.listen(port, () => {
  // Log a message to the console
  console.log(`Server running on port ${port}`);
});
