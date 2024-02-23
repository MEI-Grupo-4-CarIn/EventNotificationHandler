# ExternalEventHandler

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-ExternalEventHandler-blue)](https://hub.docker.com/r/duartefernandes/external-event-handler)
[![Docker Image Version (latest by date)](https://img.shields.io/docker/v/duartefernandes/external-event-handler?label=version)](https://hub.docker.com/r/duartefernandes/external-event-handler)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/duartefernandes/external-event-handler?label=size)](https://hub.docker.com/r/duartefernandes/external-event-handler)
[![Docker Pulls](https://img.shields.io/docker/pulls/duartefernandes/external-event-handler)](https://hub.docker.com/r/duartefernandes/external-event-handler)

This is a application for handling external events that can reach the system and publishes them into RabbitMQ.

Each route is associated with a vehicle and a user (driver), and the service verifies the existence of the vehicle and the user by making requests to the [Vehicles.MicroService](https://github.com/duartefernandes/Vehicles.MicroService) and [Auth.MicroService](https://github.com/duartefernandes/Auth.MicroService), respectively. The service also uses the [OpenRouteService API](https://openrouteservice.org) to perform geocoding actions and calculate route distances and durations.

This application is part of a larger project that includes other microservices and an API gateway. The other components of the project can be found at the following links:
 - [Auth.MicroService](https://github.com/duartefernandes/Auth.MicroService)
 - [Vehicles.MicroService](https://github.com/duartefernandes/Vehicles.MicroService)
 - [Routes.MicroService](https://github.com/duartefernandes/Routes.MicroService)
 - [OcelotApiGateway](https://github.com/duartefernandes/OcelotApiGateway)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Rafa26Azevedo/Routes.MicroService.git
cd Routes.MicroService
npm install
```

Next, set up your environment variables by following the instructions in the [Environment Variables](#environment-variables) section.

Finally, start the server:

```bash
npm start
```

The server will start on port 3001, and you can make requests to the `http://localhost:3002/webhook` endpoint.

## Environment Variables

This project uses environment variables for configuration. To set up your local environment, follow these steps:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file and replace the placeholder values with your actual values.

The following environment variables are used in this project:

- `RABBITMQ_URI`: The base URL of yours RabbitMQ instance.

Remember not to commit the `.env` file to the repository. This file is included in the `.gitignore` file to prevent it from being accidentally committed.

## Disclaimer

This project is part of a master's degree project and is intended for educational purposes only. It should not be used in production without further development and testing.
