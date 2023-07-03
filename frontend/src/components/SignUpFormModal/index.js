// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const isFormEmpty = !email || !username || !firstName || !lastName || !password || !confirmPassword;


  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
          <input className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        {errors.email && <p className="error-signup">{errors.email}</p>}
          <input className="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        {errors.username && <p className="error-signup">{errors.username}</p>}
          <input className="first-name-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        {errors.firstName && <p className="error-signup">{errors.firstName}</p>}
          <input className="last-name-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        {errors.lastName && <p className="error-signup">{errors.lastName}</p>}
          <input className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        {errors.password && <p className="error-signup">{errors.password}</p>}
          <input className="confirm-password-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confrim Password"
          />
        {errors.confirmPassword && (
          <p className="error-signup">{errors.confirmPassword}</p>
        )}
        <button className="sign-up-button" type="submit" disabled={isFormEmpty}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
