import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro M2",
    category: "Laptops",
    price: 2499,
    stock: 8,
    image: "/assets/images/macbook-pro-m2.webp",
  },
  {
    id: 2,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: 99,
    stock: 0,
    image: "/assets/images/logitech-mx-master.jpg",
  },
  {
    id: 3,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1899,
    stock: 3,
    image: "/assets/images/dell-xps-15.jpg",
  },
];

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_PRODUCTS;
}

export async function getProductById(id: number | string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_PRODUCTS.find((p) => String(p.id) === String(id)) || null;
}
