const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");
const yaml = require("js-yaml");

// ✅ 각 YAML 파일을 불러와서 합침
const userGoals = yaml.load(fs.readFileSync("./docs/getUserGoals.yaml", "utf8"));
const goalById = yaml.load(fs.readFileSync("./docs/getGoalById.yaml", "utf8"));
const goalRecord = yaml.load(fs.readFileSync("./docs/postGoalRecord.yaml", "utf8"));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo API Documentation",
    version: "1.0.0",
    description: "Daily Vivea Todo 부분 관련 Swagger입니다.",
  },
  servers: [
    {
      url: "https://gunanana.onrender.com",
      description: "render배포",
    },
  ],
  paths: {...userGoals.paths, ...goalById.paths, ...goalRecord.paths},
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
