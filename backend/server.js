const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
var cors = require("cors");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// // Cors setings
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   // res.setHeader(
//   //   "Access-Control-Allow-Origin",
//   //   "https://assingment-12-ph.netlify.app"
//   // );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
