const express = require("express");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./Auth/Route"));
const PORT = 2309;

const Server = app.listen(PORT, () =>
  console.log(`Server listening at ${PORT}`)
);

connectDB();

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  Server.close(() => {
    process.exit(1);
  });
});
