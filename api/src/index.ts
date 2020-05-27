require('dotenv').config()
import "reflect-metadata";
import { createConnection, getConnectionManager } from "typeorm";
const express = require("express");
import * as bodyParser from "body-parser";
import cors from "cors";
import appRoutes from "./routes";
import logger from "./utils/logger";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {
  const defaultConnection = getConnectionManager().get("default");
  const { type, database } = defaultConnection.options;
  // create express app
  const app = express();
  app.use(bodyParser.json());
  const corsOption: object = {
    headers: "Origin, X-Requested-With, Content-Type, Accept, Authorization ",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: "*",
  };
  app.use(cors(corsOption));
  app.use("/api", appRoutes);

  // run app
  app.listen(process.env.PORT || 3400);

  logger.info(`Database type : ${type}`);
  logger.info(`Database name : ${database}`);
  logger.info(`API server is running at http://localhost:${process.env.PORT} in ${app.get("env")} mode.`);
  logger.info("Press CTRL-C to stop.");

}).catch(error => logger.error("TypeORM connection error: ", error));