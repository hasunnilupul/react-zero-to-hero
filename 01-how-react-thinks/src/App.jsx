import Counter from './Counter';

function Greeting() {
  return <h2>Welcome to React</h2>;
}

function App() {
  return (
    <>
      <Greeting />
      <Greeting />
      <Counter />
    </>
  )
}

export default App
