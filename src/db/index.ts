/* eslint-disable @typescript-eslint/ban-types */
import { Connection, createConnection } from 'typeorm';
import ORMConfig from '../../ormconfig';

export const connect = (mediator: any) => {
  let connection: Connection | undefined;

  mediator.once('boot.ready', async () => {
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
};
