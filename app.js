const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./Routes/ProductRoutes");
require("dotenv").config();
const userRoutes = require("./Routes/UserRoutes");

const app = express();
const PORT = process.env.PORT;

//#Middlewares

// *Body parser middleware
app.use(express.json());

// *Routes middleware
app.use("/api/v1/products", productRoutes);
app.use("/api/users", userRoutes);

// #connect mongoose and start the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB Successfully.");
      console.log(`Server is running on PORT ${PORT} ...`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

//-> In the code above, useNewUrlParser: true and useUnifiedTopology: true are options passed to the mongoose.connect() method when connecting to the MongoDB database. These options are used to configure the behavior of the MongoDB driver and Mongoose during the connection process.

// useNewUrlParser: true: This option tells Mongoose to use the new URL parser in the MongoDB Node.js driver. Prior to MongoDB Node.js driver version 3.1.0, the default URL parser was deprecated, and this option was necessary to enable the new parser. With the newer versions of the MongoDB Node.js driver, this option is no longer required, but it is still recommended to include it for backward compatibility with older versions of the driver.

// useUnifiedTopology: true: This option enables the new unified topology engine in the MongoDB Node.js driver. Prior to MongoDB Node.js driver version 3.1.0, the default topology engine was deprecated in favor of the unified topology engine. Enabling this option ensures that Mongoose uses the newer, more efficient, and feature-rich unified topology engine.

// Including these options when connecting to the database is a best practice, especially if you are using a version of the MongoDB Node.js driver that predates version 3.1.0. However, even with newer versions, using these options won't cause any harm, so it's still recommended to include them for consistency and to be compatible with various environments.
