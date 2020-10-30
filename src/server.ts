import 'express-async-errors';
import express, { Request, Response, Express, NextFunction } from 'express';

import * as database from '@src/database';
import routes from '@src/routes';
import AppError from '@src/errors/AppError';

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();
    this.database();
    this.routes();
    this.app.use(this.handleErrors);
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private async database(): Promise<void> {
    await database.connect();
  }

  private routes(): void {
    this.app.use(routes);
  }

  private handleErrors(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
      return;
    }

    console.error(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });

    next(err);
  }
}

export default new App().app;

// const app = express();

// app.use(express.json());
// app.use(routes);

// app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
// if (err instanceof AppError) {
//   return response.status(err.statusCode).json({
//     status: 'error',
//     message: err.message,
//   });
// }

// console.error(err);

// return response.status(500).json({
//   status: 'error',
//   message: 'Internal server error.',
// });
// });

// export default app;
