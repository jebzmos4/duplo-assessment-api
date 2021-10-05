/* eslint-disable @typescript-eslint/ban-types */
import { Connection, createConnection, getConnection } from 'typeorm';
import ORMConfig from '../../ormconfig';

export const connect = (mediator: any) => {
  let connection: Connection | undefined;

  mediator.once('boot.ready', async () => {
    // try {
    //   connection = getConnection();
    // } catch (e) {
    //   console.log({ e });
    //   mediator.emit('db.error', e);
    // }

    try {
      if (connection) {
        if (!connection.isConnected) {
          await connection.connect();
          mediator.emit('db.ready', connection);
        }
      } else {
        connection = await createConnection(ORMConfig);
        mediator.emit('db.ready', connection);
      }
    } catch (e) {
      mediator.emit('db.error', e);
    }
  });
};

export const disconnect = () => {
  // if (!database) {
  //   return;
  // }
  // mongoose.disconnect();
};
