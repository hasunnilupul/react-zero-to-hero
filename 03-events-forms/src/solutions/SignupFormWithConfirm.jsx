// Solution to the "Try it yourself" exercise at the end of Article 3.
// Adds a "Confirm email" field. The mismatch error needs NO new state:
// it is derived in validate(), just like every other error.
import { useState } from "react";

const initialValues = { name: "", email: "", confirmEmail: "", track: "", agree: false };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email.";
  if (values.confirmEmail !== values.email) errors.confirmEmail = "Emails don't match.";
  if (!values.track) errors.track = "Pick a track.";
  if (!values.agree) errors.agree = "You must accept the code of conduct.";
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function SignupFormWithConfirm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const showError = (field) => ((touched[field] || submitted) && errors[field]) || null;

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    console.log("Submitting", values);
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }

  const inputProps = (name) => ({
    id: `s-${name}`,
    name,
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": !!showError(name),
    "aria-describedby": `s-${name}-error`,
  });

  return (
    <div className="stack">
      <h2>Exercise solution: confirm email</h2>
      <p>
        The mismatch error is derived from <code>values</code>, so there is no extra state to keep
        in sync.
      </p>

      <form onSubmit={handleSubmit} noValidate className="form">
        <Field id="s-name" label="Name" error={showError("name")}>
          <input {...inputProps("name")} value={values.name} />
        </Field>

        <Field id="s-email" label="Email" error={showError("email")}>
          <input {...inputProps("email")} type="email" value={values.email} />
        </Field>

        <Field id="s-confirmEmail" label="Confirm email" error={showError("confirmEmail")}>
          <input {...inputProps("confirmEmail")} type="email" value={values.confirmEmail} />
        </Field>

        <Field id="s-track" label="Track" error={showError("track")}>
          <select {...inputProps("track")} value={values.track}>
            <option value="">Choose one…</option>
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
          </select>
        </Field>

        <div className="field">
          <label className="checkbox">
            <input {...inputProps("agree")} type="checkbox" checked={values.agree} />
            I accept the code of conduct
          </label>
          {showError("agree") && (
            <p id="s-agree-error" role="alert" className="error">
              {errors.agree}
            </p>
          )}
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
