export {};

declare global {
  interface IAccounts {
    id: number;
    email: string;
    name: string;
    role: string;
  }
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface IotData {
    id: number;
    device_id: string;
    temperature: number | null;
    gas: number | null;
    timestamp: string;
  }
}
