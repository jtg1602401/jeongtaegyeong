import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const fs = require("fs");
const yaml = require("js-yaml");

const userGoals = yaml.load(fs.readFileSync("./docs/getUserGoals.yaml", "utf8"));
const goalById = yaml.load(fs.readFileSync("./docs/getGoalById.yaml", "utf8"));
const goalRecord = yaml.load(fs.readFileSync("./docs/postGoalRecord.yaml", "utf8"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DailyVivea API",
      version: "1.0.0",
      description: "DailyVivea 프로젝트의 API 문서",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "로컬 서버",
      },
    ],
  },
  paths: {...userGoals.paths, ...goalById.paths, ...goalRecord.paths},
  apis: ["./src/routes/*.js", "./swaggerDocs/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(" Swagger 문서: http://localhost:3000/api-docs");
};

export default swaggerDocs;

