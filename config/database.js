const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://localhost:27017/passport-auth")
    .then(() => {
      console.log("database is connected");
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = db;
