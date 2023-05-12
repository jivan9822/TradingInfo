const mongoose = require('mongoose');

const mongooseConnection = () => {
  mongoose
    .connect(process.env.mongoDb)
    .then((res) => {
      console.log('Connection to mongoDb Success!');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongooseConnection();
