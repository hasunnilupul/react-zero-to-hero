import ProfileCard from "./ProfileCard.jsx";
import Counter from "./Counter.jsx";

export default function Examples() {
  return (
    <>
      <h2>Props</h2>
      <ProfileCard name="Nilupul" role="Senior Engineer">
        <button>Follow</button>
      </ProfileCard>
      <ProfileCard name="Sam" /> {/* role falls back to "Developer" */}

      <h2>State</h2>
      <Counter />
    </>
  );
}
