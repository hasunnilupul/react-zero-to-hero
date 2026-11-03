export default function ProductItem({ product }) {
  return (
    <li className="product">
      <div>
        <p className="product-name">{product.name}</p>
        <p className="product-meta">{product.category}</p>
      </div>
      <div className="product-side">
        <p className="product-price">${product.price}</p>
        {!product.inStock && <span className="tag">Out of stock</span>}
      </div>
    </li>
  );
}
