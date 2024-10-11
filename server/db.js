const Mongoose = require("mongoose");
const localDB = `mongodb://localhost:27017/security_key`;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
