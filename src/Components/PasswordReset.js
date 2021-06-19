import React from "react";
import Navbar from "./Navbar";
import firebase from "firebase/app";
import "firebase/auth";
import Alert from "./Alert";

function PasswordReset({ history }) {
  const [email, setEmail] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [response, setResponse] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setEmail("");
      setIsOpen(true);
      setResponse(true);
      setMessage("Password Reset mail sent.");
      const timer = () => {
        setTimeout(() => {
          history.replace("/signIn");
        }, 5000);
      };
      timer();
      clearTimeout(timer);
    } catch (error) {
      setIsOpen(true);
      setResponse(false);
      setMessage("Email does not exist.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="hero-container">
        <div className="reset-container ">
          <h1 className="text-center text-white font-semibold text-xl">
            Forgot Password?
          </h1>
          {isOpen ? (
            <Alert
              message={message}
              setIsOpen={setIsOpen}
              response={response}
            />
          ) : (
            ""
          )}
          <form onSubmit={resetPassword} className="mt-8 space-y-6">
            <div className="space-y-1">
              <p className="font-semibold text-white">Enter your email</p>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="input"
                placeholder="Email address"
              />
            </div>
            <button type="submit" className="reset-btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordReset;
