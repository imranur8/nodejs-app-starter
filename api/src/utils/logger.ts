import winston from "winston";

const options: winston.LoggerOptions = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    // new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export const stream = {
  write: (text: string) => {
      logger.info(text)
  }
}
export default logger;