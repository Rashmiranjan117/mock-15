require("dotenv").config();
const { userRouter } = require("./routes/user.routes");
const { jobsRouter } = require("./routes/jobs.routes");
const { authenticate } = require("./middleware/authenticate.middleware");
const { connection } = require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("/user , /job");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/jobs", jobsRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Sever is connected to db.");
  } catch (err) {
    console.log("Something went wrong");
  }
  console.log("Server is running on port", process.env.port);
});
