const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

const user = require("./routes/user");
const customer = require("./routes/customer");
const product = require("./routes/product");
const service = require("./routes/service");
const shop = require("./routes/shop");
const sold = require("./routes/sold");
const productService = require("./routes/product-service");

const app = express();

// const HttpError = require('./models/http-error');

app.use(bodyParser.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/logs/access.log"),
  { flags: "a" }
);
// app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next();
});

app.use("/api/user", user);
app.use("/api/customer", customer);
app.use("/api/product", product);
app.use("/api/service", service);
app.use("/api/shop", shop);
app.use("/api/sold", sold);
app.use("/api/product-service", productService);

// app.use('/api/places', placesRoutes);
// app.use('/api/users', usersRoutes);

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || 'An unknown error occurred!' });
// });
app.listen(5000);
