const mongoose = require('mongoose');

const mongooseConnection = () => {
  mongoose
    .connect(process.env.mongoDb)
    .then((res) => {
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongooseConnection();
