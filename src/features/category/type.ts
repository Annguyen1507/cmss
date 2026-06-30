export type Category = {
  id: string;
  name: string;
};

export type CategoryResponse = {
  message: string;
  data: Category[];
};