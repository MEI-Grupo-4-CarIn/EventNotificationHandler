const express = require('express');
const fs = require('fs');
const app = express();

const port = 3002;

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

const webhookRoute = require('./webhook');

app.use(express.json());
app.use('/webhook', webhookRoute);

app.listen(port, () => {
    console.log(`Webhook microservice listening on port ${port}`);
});