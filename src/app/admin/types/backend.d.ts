export {};

declare global {
  interface IUser {
    email: string;
    password: string;
    role: string;
    name: string;
  }
}
