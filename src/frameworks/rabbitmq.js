const amqp = require("amqplib/callback_api");

function subscribeToQueue(processMessage) {
  const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost";

  amqp.connect(rabbitmqUrl, (error0, connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = "notificationQueue";

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(queue, processMessage, {
        noAck: true,
      });
    });
  });
}

module.exports = { subscribeToQueue };
