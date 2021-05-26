import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

function RForm({ btnName, setFunction }) {
  const info = {
    email: "",
    password: "",
  };
  const [details, setDetails] = useState(info);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (btnName === "Register") {
      if (Object.entries(details).length > 0) {
        if (details.password.length > 6) {
          setLoading(true);
          await firebase
            .auth()
            .createUserWithEmailAndPassword(details.email, details.password)
            .then((userCredential) => {
              // Signed in
              alert("You have registered successfully....");          
              history.push("/signIn");
            })
            .catch((error) => {
              let choice = window.confirm(
                "Would you like to sign in instead??"
              );
              if (choice) history.push("/signIn");
            });
        }
      }
    } else {
       firebase
        .auth()
        .signInWithEmailAndPassword(details.email, details.password)
        .then(async (userCredential) => {
          setLoading(true);
          const id = userCredential.user.uid;
          const uname = userCredential.user.email.split("@", 1);
          const token = await userCredential.user.getIdToken(true);
          localStorage.setItem("authorized", token);
          history.push({ pathname: `/passaver/${uname}`, state: { id } });
        })
        .catch((error) => {
          alert("The password is invalid.Please try again");
        });
    }
    setDetails(info);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {setFunction} your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {btnName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RForm;
