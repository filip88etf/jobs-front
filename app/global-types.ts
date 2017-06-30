export interface Option {
  value: any;
  label: string;
};

export class Filter {
  type: string;
  profession: string;
  region: string;
  page: number;
  size: number;
}
