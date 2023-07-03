// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUserLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(closeModal)
  }

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="login-form">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <input className="username-input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username or Email"
          required
        />
        {errors.credential && <p className='error-login'>{errors.credential}</p>}
        <input className="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        {errors.password && <p className='error-login'>{errors.password}</p>}
        <button type="submit" className="login-button" disabled={isDisabled}>Log In</button>
      </form>
      <button onClick={demoUserLogin} className='demo-user-button'>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
