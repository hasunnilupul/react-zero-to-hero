// Derives the total instead of storing it.
export default function CartSummary({ items, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside>
      <h2>Cart ({items.length})</h2>
      {items.map((item, i) => (
        // Index keys are a shortcut for this demo; article 4 covers stable keys.
        <p key={i}>
          <span>{item.name}</span>
          <button onClick={() => onRemove(i)}>Remove</button>
        </p>
      ))}
      <strong>Total: ${total}</strong>
    </aside>
  );
}
