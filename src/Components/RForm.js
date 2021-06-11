import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../Contexts/AuthProvider";
import Alert from "./Alert";

function RForm({ btnName, setFunction }) {
  const info = {
    email: "",
    password: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState("");
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
      if (Object.entries(details).length > 0) {
        if (details.password.length > 6) {
          try {
            setLoading(true);
            await signup(details.email, details.password);
            setLoading(false);
            setResponse("Success");
            setMessage("You have registered successfully....");
            setIsOpen(true);
            history.push("/signIn");
          } catch {
            let choice = window.confirm("Would you like to sign in instead??");
            if (choice) history.push("/signIn");
          }
        }
      }
    } else {
      try {
        setLoading(true);
        const userCredentials = await login(details.email, details.password);
        const { email } = userCredentials.user;
        const id = userCredentials.user.uid;
        const token = await userCredentials.user.getIdToken(true);
        setDetails(info);
        localStorage.setItem("authorized", token);
        history.push({
          pathname: `/passaver/${email.split("@", 1)}/`,
          state: { id },
        });
      } catch {
        setResponse("Error");
        setMessage("Wrong email or password!!");
        setIsOpen(true);
        setDetails(info);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Alert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        response={response}
        message={message}
      />
      <div className="hero-container">
        <div className="sub-container">
          <img
            className="logo"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="account-text">{setFunction} your account</h2>

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
          </form>
        </div>
      </div>
    </>
  );
}

export default RForm;
