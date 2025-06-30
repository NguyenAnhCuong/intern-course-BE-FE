export {};

declare global {
  interface IAccounts {
    id: number;
    email: string;
    name: string;
    role: string;
  }
  interface IChangePass {
    currPassword: string;
    newPassword: string;
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
    id: string;
    device_id: string;
    temperature: number | null;
    gas: number | null;
    timestamp: string;
  }

  interface IPermit {
    id: string;
    user_id: string;
    devices_id: string;
    can_view: boolean;
  }

  interface IDevices {
    id: string;
    name: string;
    status: string;
  }

  interface IMail {
    archived: boolean;
    created_at: DateTime;
    device_id: string;
    id: string;
    is_read: boolean;
    message: string;
    type: string;
    user_email: string;
  }
}
