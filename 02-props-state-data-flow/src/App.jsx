import { useState } from "react";
import ProductList from "./ProductList.jsx";
import CartSummary from "./CartSummary.jsx";

const PRODUCTS = [
  { id: 1, name: "Keyboard", price: 49 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Monitor", price: 189 },
];

// The parent owns the cart.
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeAt = (index) => setCart(cart.filter((_, i) => i !== index));

  return (
    <>
      <ProductList products={PRODUCTS} onAdd={addToCart} />
      <CartSummary items={cart} onRemove={removeAt} />
    </>
  );
}
