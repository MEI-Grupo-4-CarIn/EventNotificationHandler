const winston = require("winston");
require("winston-elasticsearch");

const esTransportOpts = {
  level: "info",
  clientOpts: { node: process.env.ELASTICSEARCH_HOST },
  indexPrefix: "notification-service",
  indexSuffixPattern: "YYYY.MM.DD",
  ensureIndexTemplate: true,
  indexTemplate: {
    mappings: {
      properties: {
        "@timestamp": { type: "date" },
        message: { type: "text" },
        level: { type: "keyword" },
      },
    },
  },
};

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [new winston.transports.Elasticsearch(esTransportOpts)],
});

module.exports = logger;
