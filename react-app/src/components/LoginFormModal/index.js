import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [errObj, setErrObj] = useState({})
  const { closeModal } = useModal();

  useEffect(() => {

  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="login-form-wrapper">
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          {errors.map((error, idx) => (
            <div className='form-error-message' key={idx}>{error.split(': ')[1]}</div>
          ))}
        </div>
        <label>
          Email
          <input
            type="text"
            className="login-text-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login-text-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='submit-button' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
