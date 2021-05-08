const port = process.env.PORT || 8004;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routes/users");
const videoRouter = require("./routes/video");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("SERVER RESPONSE");
});
app.get("/api", (req, res) => {
  res.send("Response");
});

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/video", videoRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
