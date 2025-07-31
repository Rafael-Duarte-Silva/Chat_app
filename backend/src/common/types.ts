export interface CustomRequest extends Request {
  user: {
    sub: string;
  };
}
