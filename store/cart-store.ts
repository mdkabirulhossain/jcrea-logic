import { useAppDispatch, useAppSelector } from "./hooks";
import { addItem, removeItem, clearCart, type CartItem } from "./slices/cart-slice";
import type { Product } from "@/types/product";

export * from "./index";
export * from "./slices/cart-slice";

export function useCartStore<T>(
  selector: (state: {
    totalCount: () => number;
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number | string) => void;
    clearCart: () => void;
  }) => T
): T {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const totalCount = () =>
    items.reduce((acc, item) => acc + (item.qty ?? 1), 0);
  const handleAddItem = (product: Product) => dispatch(addItem(product));
  const handleRemoveItem = (id: number | string) => dispatch(removeItem(id));
  const handleClearCart = () => dispatch(clearCart());

  return selector({
    totalCount,
    items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
  });
}
