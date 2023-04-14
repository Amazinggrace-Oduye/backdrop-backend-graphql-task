export interface IUser {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_verified: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
