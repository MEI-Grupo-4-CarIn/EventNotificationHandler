const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 3002;

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

const uri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

const { subscribeToQueue } = require("./frameworks/rabbitmq");
const { processMessage } = require("./controllers/notificationController");
const webhookRoute = require("./webhook");
const tokenRoute = require("./routes/tokenRoutes");

app.use(express.json());
app.use("/webhook", webhookRoute);
app.use("/tokens", tokenRoute);

subscribeToQueue(processMessage);

app.listen(port, () => {
  console.log(`Webhook microservice listening on port ${port}`);
});
