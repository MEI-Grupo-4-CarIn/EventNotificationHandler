const express = require('express');
const router = express.Router();
const amqp = require('amqplib/callback_api');

function initializeEventHandlers(channel) {
    const queues = ['ROUTES_Recalculate', 'VEHICLES_Assistance'];
    queues.forEach(queue => {
        channel.assertQueue(queue, { durable: true });
    });

    const eventHandlers = {
        'ROUTES_Recalculate': async (eventData) => {
            const queueName = 'ROUTES_Recalculate';
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(eventData)));
        },
        'VEHICLES_Assistance': async (eventData) => {
            const queueName = 'VEHICLES_Assistance';
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(eventData)));
        },
    };

    const defaultEventHandler = async (eventData) => {
        console.log(`Received unknown event: ${eventData.action}`);
    };

    router.post('/', async (req, res) => {
        const eventData = req.body;
        const eventType = eventData.action;

        if (eventHandlers.hasOwnProperty(eventType)) {
            await eventHandlers[eventType](eventData);
            res.status(200).send(`Event ${eventType} handled successfully.`);
        } else {
            await defaultEventHandler(eventData);
            res.status(200).send(`Event ${eventType} is unknown, but handled by default handler.`);
        }
    });
}

amqp.connect(process.env.RABBITMQ_URI, (error0, conn) => {
    if (error0) {
        throw error0;
    }
    connection = conn;
    connection.createChannel((error1, ch) => {
        if (error1) {
            throw error1;
        }
        channel = ch;

        initializeEventHandlers(channel);
    });
});

module.exports = router;