# EventNotificationHandler

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-EventNotificationHandler-blue)](https://hub.docker.com/r/duartefernandes/event-notification-handler)
[![Docker Image Version (latest by date)](https://img.shields.io/docker/v/duartefernandes/event-notification-handler?label=version)](https://hub.docker.com/r/duartefernandes/event-notification-handler)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/duartefernandes/event-notification-handler?label=size)](https://hub.docker.com/r/duartefernandes/event-notification-handler)
[![Docker Pulls](https://img.shields.io/docker/pulls/duartefernandes/event-notification-handler)](https://hub.docker.com/r/duartefernandes/event-notification-handler)

This application handles external events that can reach the system, publishes them into _RabbitMQ_, and processes notifications.

This application is part of a larger project with other microservices and an API gateway. The other components of the project can be found at the following links:

- [Auth.MicroService](https://github.com/duartefernandes/Auth.MicroService)
- [Vehicles.MicroService](https://github.com/duartefernandes/Vehicles.MicroService)
- [Routes.MicroService](https://github.com/duartefernandes/Routes.MicroService)
- [OcelotApiGateway](https://github.com/duartefernandes/OcelotApiGateway)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/MEI-Grupo-4-CarIn/EventNotificationHandler.git
cd EventNotificationHandler
npm install
```

Next, set up your environment variables by following the instructions in the [Environment Variables](#environment-variables) section.

Finally, start the server:

```bash
npm start
```

The server will start on port 3002, and you can make requests to the `http://localhost:3002/webhook` endpoint.

## Environment Variables

This project uses environment variables for configuration. To set up your local environment, follow these steps:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file and replace the placeholder values with your actual values.

The following environment variables are used in this project:

- `RABBITMQ_URI`: The base URL of your _RabbitMQ_ instance.

Remember not to commit the `.env` file to the repository. This file is included in the `.gitignore` file to prevent it from being accidentally committed.

## Disclaimer

This project is part of a master's degree project and is intended for educational purposes only. It should not be used in production without further development and testing.
