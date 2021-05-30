export interface IUser {
  id: string;
  name: string;
  desc: string;
  mobile: string;
  birthday: string;
}

export interface IQueryUser extends IUser {
  page: number;
  size: number;
}
