import Counter from './Counter';

function Greeting() {
  return <h2>Welcome to React</h2>;
}

function App() {
  const name = "Nilupul";
  const year = new Date().getFullYear();

  return (
    <>
      <h1 className="title">Hello, {name}!</h1>
      <p>It is {year}, and this page is built with React.</p>

      <Greeting />
      <Greeting />
      <Counter />
    </>
  )
}

export default App
