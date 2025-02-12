import express from 'express';
import docs from './config/swagger.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import experienceRouter from './src/routes/experienceRoutes.js';
import goalRouter from './src/routes/goalRoutes.js';
import errorMiddleware from './src/middlewares/errorMiddleware.js';


require('dotenv').config(); 

console.log('JWT_SECRET:', process.env.JWT_SECRET);  // JWT_SECRET 값 확인


const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoutes");

app.use(express.json()); // JSON 요청 처리 

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// Swagger 적용
docs(app);

app.use("/api", userRoutes);
app.use('/api', experienceRouter);
app.use('/api', goalRouter);

app.use('*', (req, res, next) => {
  const error = new Error();
  error.statusCode = 404;
  next(error); 
});

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
