const express = require("express");

//connect to database
require("./config/dbconnect");

const app = express();
app.use(express.json());

app.use("/auth", require("./routers/authRouter"));
app.use("/users", require("./routers/userRouter"));

app.listen(4000, () => console.log("server run and running"));
