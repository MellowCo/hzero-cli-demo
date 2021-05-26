export interface IEmployee {
  id: string;
  name: string;
  desc: string;
  charger: string;
  date: string;
}

export interface IQueryEmployee {
  id?: string;
  name?: string;
  charger?: string;
  date?: string;
  page?: number;
  size?: number;
}
