import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../Contexts/AuthProvider";
import Alert from "./Alert";

function RForm({ btnName, setFunction, setToken }) {
  const info = {
    email: "",
    password: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState(info);
  const { login, signup } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (btnName === "Register") {
      if (Object.entries(details).length > 0 && details.password.length > 6) {
        setLoading(true);
        const res = await signup(details.email, details.password);
        setLoading(false);
        if (res.data === "success") {
          setResponse(true);
          setMessage("You have registered successfully");
          setIsOpen(true);
          const timedpush = () => {
            setTimeout(() => history.push("/signIn"), 5000);
          };
          timedpush();
          clearTimeout(timedpush);
        } else {
          let choice = window.confirm("Would you like to sign in instead??");
          if (choice) history.push("/signIn");
          else setLoading(false);
        }
      } else {
        setResponse(false);
        setMessage("Please enter strong password....");
        setIsOpen(true);
        setLoading(false);
      }
    } else {
      setLoading(true);
      const res = await login(details.email, details.password);
      const result = await res.data;
      if (result.code === "auth/wrong-password") {
        setResponse(false);
        setMessage("Wrong email or password!!");
        setIsOpen(true);
        setDetails(info);
        setLoading(false);
      } else if (result.code === "auth/user-not-found") {
        setResponse(false);
        setMessage("User not found!!");
        setIsOpen(true);
        setDetails(info);
        setLoading(false);
      } else {
        setToken(result.user.stsTokenManager.accessToken);
        // console.log("token" + result.user.stsTokenManager.refreshToken);
        const email = result.user.email;
        const id = result.user.uid;
        const token = await result.user.stsTokenManager.refreshToken;
        setDetails(info);
        localStorage.setItem("authorized", token);
        history.push({
          pathname: `/passaver/${email.split("@", 1)}/`,
          state: { id },
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero-container">
        <div className="sub-container">
          <img
            className="logo"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="account-text">{setFunction} your account</h2>
          {isOpen ? (
            <Alert
              message={message}
              response={response}
              setIsOpen={setIsOpen}
            />
          ) : (
            ""
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={details.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="input"
                placeholder="Email address"
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="off"
                required
                value={details.password}
                onChange={handleChange}
                className="input"
                placeholder="Password"
              />
            </div>
            <button disabled={loading} type="submit" className="submit-btn">
              {btnName}
            </button>
            <NavLink to="/passwordReset" className="password-reset-link">
              {btnName === "Sign In" ? "Forgot Password?" : ""}
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
}

export default RForm;
