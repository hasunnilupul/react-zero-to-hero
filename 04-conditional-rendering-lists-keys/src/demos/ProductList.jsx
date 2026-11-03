import { useState } from 'react';
import { products, categories } from '../data/products.js';
import ProductItem from './ProductItem.jsx';

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
};

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Derived data: computed during render, never stored in state.
  const visible = products
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => !inStockOnly || p.inStock)
    .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    .toSorted(sorters[sortBy]);

  function clearFilters() {
    setQuery('');
    setCategory('All');
    setInStockOnly(false);
  }

  return (
    <div className="card">
      <div className="filters">
        <label>
          Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. monitor" />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="priceAsc">Price: low to high</option>
            <option value="priceDesc">Price: high to low</option>
          </select>
        </label>
        <label className="inline">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          In stock only
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        Showing {visible.length} of {products.length}
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <p>No products match your filters.</p>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="products">
          {visible.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
