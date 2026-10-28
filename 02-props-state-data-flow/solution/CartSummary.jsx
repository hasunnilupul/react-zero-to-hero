export default function CartSummary({ items, onRemove }) {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <aside>
      <h2>Cart ({count})</h2>
      {items.map((item) => (
        // Stable key: the product id.
        <p key={item.id}>
          <span>
            {item.name} × {item.qty}
          </span>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </p>
      ))}
      <strong>Total: ${total}</strong>
    </aside>
  );
}
