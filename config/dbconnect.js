const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connect successfully!"))
  .catch((err) => console.log(err.message));
