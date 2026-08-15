import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    name: "MacBook Pro M2",
    category: "Laptops",
    price: 2499,
    stock: 8,
    image: "/assets/images/macbook-pro-m2.jpg",
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

export async function GET() {
  await new Promise((r) => setTimeout(r, 800)); // simulate latency for skeleton testing
  return NextResponse.json(products);
}
