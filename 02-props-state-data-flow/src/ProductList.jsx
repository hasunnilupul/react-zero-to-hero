// Reads props, asks the parent to change data.
export default function ProductList({ products, onAdd }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <span>
            {p.name} ${p.price}
          </span>
          <button onClick={() => onAdd(p)}>Add</button>
        </li>
      ))}
    </ul>
  );
}
