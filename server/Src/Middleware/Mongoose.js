const mongoose = require('mongoose');

const mongooseConnection = () => {
  mongoose
    .connect(process.env.mongoDb)
    .then((res) => {
      console.log('Connection to mongoose database success!');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongooseConnection();
