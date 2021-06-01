import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory, useLocation, useParams } from "react-router-dom";
import firebase from "./firebase";
import "firebase/auth";
import Navbar from "./Navbar";

function PassManager() {
  const history = useHistory();
  const { uname } = useParams();
  const location = useLocation();
  const uid = location.state.id;
  const info = {
    title: "",
    pass: "",
  };
  const [details, setDetails] = useState(info);
  const [list, setList] = useState([]);
  const [state, setState] = useState(false);
  const [authorized, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const url = "https://server-app14.herokuapp.com";

  const fetch = () => {
    Axios.get(`${url}/showPasswords/${uid}`).then((response) => {
      setList(response.data);
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(true);
    let containsPass = false;
    if (!details.pass || !details.title) {
      alert("Please enter password/title");
    } else {
      list.forEach((val) => {
        if (val.title.toUpperCase() === details.title.toUpperCase()) {
          containsPass = true;
        }
      });
      if (containsPass)
        alert(`You already have a password for ${details.title}`);
      else {
        Axios.post(`${url}/addPassword`, {
          id: uid,
          title:
            details.title[0].toUpperCase() +
            details.title.substr(1, details.title.length),
          password: details.pass,
        }).catch((err) => console.log(err));
      }
      setDetails(info);
    }
  };

  const deletePass = (value) => {
    setState(true);
    Axios.post(`${url}/deletePassword/${uid}`, {
      id: value,
    });
  };

  const decryptPassword = (val) => {
    Axios.post(`${url}/decryptPassword`, {
      password: val.password,
      iv: val.iv,
    }).then((res) => {
      alert(`Your password is ${res.data}`);
    });
  };

  useEffect(() => {
    fetch();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch();
    }, 1000);
    setState(false);
    if (!state) clearTimeout(timer);
    // eslint-disable-next-line
  }, [list, state]);

  useEffect(() => {
    if (!authorized) {
      localStorage.removeItem("authorized");
      firebase.auth().signOut();
      history.push("/signIn");
    }
  });

  const check = () => {
    let choice = window.confirm("Do you want to logout?");
    if (choice) setAuth(false);
  };

  return (
    <>
      <Navbar uname={uname} logout={check} />
      <div className="container max-w-full h-screen space-y-2.5  text-white ">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-3 items-center bg-blue-400 rounded-2xl mx-auto w-11/12 py-10 md:w-6/12 xl:w-4/12">
            <input
              type="password"
              placeholder="Ex. password123"
              name="pass"
              value={details.pass}
              onChange={handleChange}
              className="px-8 py-2.5 text-black rounded-3xl outline-none"
            />
            <input
              type="text"
              placeholder="Ex. Facebook"
              name="title"
              value={details.title}
              onChange={handleChange}
              className="px-8 py-2.5 text-black rounded-3xl outline-none"
            />
            <button
              type="submit"
              className="bg-blue-300 rounded-2xl font-bold  p-2.5"
            >
              Add Password
            </button>
          </div>
        </form>
        {loading ? (
          <p className="flex flex-col items-center my-72">
            Loading Passwords....
          </p>
        ) : list.length > 0 ? (
          <div className="Passwords">
            {list.map((val, index) => {
              return (
                <div
                  className="flex justify-center items-baseline space-x-2 mb-2"
                  key={index}
                >
                  <div
                    className="bg-blue-200 text-black  font-semibold text-xl px-2 py-3 rounded-3xl text-center w-3/5 md:w-4/12 xl:w-3/12"
                    onClick={() => {
                      decryptPassword({
                        password: val.password.password,
                        iv: val.password.iv,
                      });
                    }}
                  >
                    <h3>{val.title}</h3>
                  </div>
                  <button
                    className="bg-blue-50 px-2 py-1.5 text-black rounded-2xl font-semibold"
                    onClick={() => deletePass(val.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mt-10">Password List Empty</p>
        )}
      </div>
    </>
  );
}

export default PassManager;
