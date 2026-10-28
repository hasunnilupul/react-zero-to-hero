import { useState } from "react";
import ProductList from "../src/ProductList.jsx";
import CartSummary from "./CartSummary.jsx";

const PRODUCTS = [
  { id: 1, name: "Keyboard", price: 49 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Monitor", price: 189 },
];

// Cart entries are now { id, name, price, qty }.
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // Same product again: copy the array and bump qty on the matching item.
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  return (
    <>
      <ProductList products={PRODUCTS} onAdd={addToCart} />
      <CartSummary items={cart} onRemove={removeItem} />
    </>
  );
}
