export {};

declare global {
  interface IAccounts {
    id: number;
    email: string;
    name: string;
    role: string;
  }
}
