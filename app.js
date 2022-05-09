const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
const router = require("./routes/routes");

const limiter = rateLimit({
  windowMs: 60000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(express.json({ extended: true }));

app.use(limiter);
app.use(router());
module.exports = app;
