const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const applicationRouter = require("./routers/applicationRouter");
const bankRouter = require("./routers/bankRouter");
const utilRouter = require("./routers/util");
const contactRouter = require("./routers/contactRouter");
const app = express();


// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/application", applicationRouter);
app.use("/bank", bankRouter);
app.use("/util", utilRouter);
app.use("/contact", contactRouter);

app.use(express.static('./static/uploads'));

app.get("/", (req, res) => {
  res.send("API Response");
});

app.listen(process.env.PORT, () => {
  console.info("Server Started>>");
});