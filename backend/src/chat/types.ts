import { Socket } from 'socket.io';

export type PrivateMessagePayload = {
  to: string;
  message: string;
};

export interface CustomSocket extends Socket {
  data: {
    id: string;
  };
}
