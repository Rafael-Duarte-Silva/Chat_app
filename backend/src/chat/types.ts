import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
  data: {
    id: string;
    username: string;
  };
}
