import ConditionalDemo from './demos/ConditionalDemo.jsx';
import KeysDemo from './demos/KeysDemo.jsx';
import ProductList from './demos/ProductList.jsx';

export default function App() {
  return (
    <main className="page">
      <header>
        <p className="eyebrow">React Zero to Senior · Article 04</p>
        <h1>Conditional Rendering, Lists, and Keys</h1>
      </header>

      <section>
        <h2>1. Conditional patterns and the 0 bug</h2>
        <ConditionalDemo />
      </section>

      <section>
        <h2>2. Why index keys cause bugs</h2>
        <KeysDemo />
      </section>

      <section>
        <h2>3. Filtering, sorting, and empty states</h2>
        <ProductList />
      </section>
    </main>
  );
}
