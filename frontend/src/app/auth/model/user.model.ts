export interface User {
  jwt_token: string;
  expiresIn: number;
  payload: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
}
