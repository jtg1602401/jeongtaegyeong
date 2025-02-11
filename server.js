require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const todoRouter = require("./src/routes/todoRouter");
const userRoutes = require("./src/routes/userRoutes");
const reportRoutes = require("./src/routes/reportRouter");

console.log('JWT_SECRET:', process.env.JWT_SECRET);  // JWT_SECRET 값 확인

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", todoRouter);
app.use("/api", userRoutes);
app.use("/reports", reportRoutes);

// ✅ Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  console.log(`📄 Swagger 문서: http://localhost:${PORT}/api-docs`);
});
