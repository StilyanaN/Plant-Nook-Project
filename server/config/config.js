const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURL: "mongodb://127.0.0.1:27017/plant-nook",
    origin: ["http://localhost:5555", "http://localhost:4200"],
  },
  production: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: [],
  },
};

// Database connection logic
if (env === "development") {
  const mongoose = require("mongoose");
  mongoose
    .connect(config[env].dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB Error,", err.message));
}

module.exports = config[env];

