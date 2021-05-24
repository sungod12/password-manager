import React, { useState } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from "react-router-dom";



function RForm({ btnName,setFunction,setName }) {
  // const {setProperties}=useProps();
  const info = {
    email: "",
    password: "",
  };
  const [details,setDetails]=useState(info);
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (btnName === "Register") {
      if (Object.entries(details).length > 0) {
        if (details.password.length > 6) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(details.email, details.password)
            .then((userCredential) => {
              // Signed in
              history.push("/signIn");
            })
            .catch((error) => {
              var errorMessage = error.message;
              console.log(errorMessage);
            });
          setDetails(info);
        }
      }
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(details.email, details.password)
        .then((userCredential) => {
          const id = userCredential.user.uid;
          const name = userCredential.user.email.split("@", 1);
          localStorage.setItem("authorized", id);
          setName(name);
          history.push({ pathname: `/passaver/${name}`, state: { id} });
        })
        .catch((error) => {
          if(error.message==="The password is invalid or the user does not have a password."){
              alert("The password is invalid.Please try again");
          }
        });
    }
  };
  return (
    <>
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
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
