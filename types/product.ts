export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  rating?: number;
}
