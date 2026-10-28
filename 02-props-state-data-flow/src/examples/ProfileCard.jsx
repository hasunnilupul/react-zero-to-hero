export default function ProfileCard({ name, role = "Developer", children }) {
  return (
    <section className="card">
      <h2>{name}</h2>
      <p>{role}</p>
      {children}
    </section>
  );
}
