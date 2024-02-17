const express = require('express');
const router = express.Router();
const amqp = require('amqplib/callback_api');

// Known event handlers
const eventHandlers = {
    'ROUTES_Recalculate': async (eventData) => {
        // Logic to recalculate the route
        // ...
        // Publish the event data to RabbitMQ
        const queueName = 'ROUTES_Recalculate';
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(eventData)));
    },
    // Add more handlers as needed for other known events
};

// Default event handler for unknown events
const defaultEventHandler = async (eventData) => {
    console.log(`Received unknown event: ${eventData.action}`);
};

// RabbitMQ connection setup
let connection;
let channel;

amqp.connect(process.env.RABBITMQ_URI, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        // Ensure the queue exists
        const queue = 'webhook_events';
        channel.assertQueue(queue, { durable: false });
    });
});

// Webhook endpoint
router.post('/', async (req, res) => {
    const eventData = req.body;
    const eventType = eventData.action;

    // Check if the event type has a known handler
    if (eventHandlers.hasOwnProperty(eventType)) {
        // Execute the known event handler
        await eventHandlers[eventType](eventData);
        res.status(200).send(`Event ${eventType} handled successfully.`);
    } else {
        // Execute the default event handler for unknown events
        await defaultEventHandler(eventData);
        res.status(200).send(`Event ${eventType} is unknown, but handled by default handler.`);
    }
});