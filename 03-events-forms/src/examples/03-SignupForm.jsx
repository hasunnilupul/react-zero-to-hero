import { useState } from "react";

const initialValues = { name: "", email: "", track: "", agree: false };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email.";
  if (!values.track) errors.track = "Pick a track.";
  if (!values.agree) errors.agree = "You must accept the code of conduct.";
  return errors;
}

export default function SignupForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const errors = validate(values); // derived on every render, never stored
  const showError = (field) => (touched[field] || submitted) && errors[field];

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's full-page reload
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    console.log("Submitting", values);
    setLastSubmission(values);
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }

  return (
    <div className="stack">
      <h2>Workshop sign-up</h2>

      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showError("name")}
            aria-describedby="name-error"
          />
          {showError("name") && (
            <p id="name-error" role="alert" className="error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showError("email")}
            aria-describedby="email-error"
          />
          {showError("email") && (
            <p id="email-error" role="alert" className="error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="track">Track</label>
          <select
            id="track"
            name="track"
            value={values.track}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showError("track")}
            aria-describedby="track-error"
          >
            <option value="">Choose one…</option>
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
          </select>
          {showError("track") && (
            <p id="track-error" role="alert" className="error">
              {errors.track}
            </p>
          )}
        </div>

        <div className="field">
          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={values.agree}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!showError("agree")}
              aria-describedby="agree-error"
            />
            I accept the code of conduct
          </label>
          {showError("agree") && (
            <p id="agree-error" role="alert" className="error">
              {errors.agree}
            </p>
          )}
        </div>

        <button type="submit">Sign up</button>
      </form>

      {lastSubmission && (
        <div className="card success" role="status">
          <strong>Submitted!</strong>
          <pre>{JSON.stringify(lastSubmission, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
