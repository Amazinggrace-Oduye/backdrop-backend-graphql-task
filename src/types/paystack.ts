export interface IPaystack {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  account_number: string;
  account_name: string;
}
