import NoEffectNeeded from './demos/NoEffectNeeded.jsx';
import DocumentTitle from './demos/DocumentTitle.jsx';
import CleanupDemo from './demos/CleanupDemo.jsx';
import FetchRaceDemo from './demos/FetchRaceDemo.jsx';
import StrictModeDemo from './demos/StrictModeDemo.jsx';

export default function App() {
  return (
    <main className="page">
      <header>
        <p className="eyebrow">React Zero to Senior · Article 05</p>
        <h1>useEffect: Side Effects, Dependencies, and Cleanup</h1>
      </header>

      <section>
        <h2>1. You might not need an effect</h2>
        <NoEffectNeeded />
      </section>

      <section>
        <h2>2. The dependency array</h2>
        <DocumentTitle />
      </section>

      <section>
        <h2>3. Cleanup: timers and event listeners</h2>
        <CleanupDemo />
      </section>

      <section>
        <h2>4. Fetching data and race conditions</h2>
        <FetchRaceDemo />
      </section>

      <section>
        <h2>5. Strict Mode runs your effects twice</h2>
        <StrictModeDemo />
      </section>
    </main>
  );
}
