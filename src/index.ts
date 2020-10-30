import config from 'config';
import server from '@src/server';
import * as database from '@src/database';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  );

  throw reason;
});

process.on('uncaughtException', error => {
  console.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

const PORT = config.get<number>('App.port');

const app = server.listen(PORT, () =>
  console.log(`App listening on port ${PORT}`),
);

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
exitSignals.map(signal =>
  process.on(signal, async () => {
    try {
      await app.close(() => console.log('App closed with success'));
      await database.disconnect(false, () =>
        console.log('MongoDB connection closed with success'),
      );
    } catch (error) {
      console.log(`App exited with error ${error}`);
      process.exit(ExitStatus.Failure);
    }
  }),
);
