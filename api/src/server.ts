import 'express-async-errors';

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { routes } from './routes';
import { AppError } from './utils/AppError';
import { UPLOADS_FOLDER } from './configs/upload';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/images", express.static(UPLOADS_FOLDER));

app.use(routes)

app.use((err: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`🚀 Server is running on Port ${PORT}`));