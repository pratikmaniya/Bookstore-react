export interface IBook {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface IBooksSliceState {
  books: IBook[];
  showModal: boolean;
  selectedBook: IBook | null;
}
