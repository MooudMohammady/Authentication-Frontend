export interface IAddress {
  readonly id?: string;
  user: string;
  city: string;
  province: string;
  plaque: string;
  unit?: number;
  description: string;
  postal_code: string;
}
