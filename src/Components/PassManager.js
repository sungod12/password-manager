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
      history.pop();
    }
  });

  const check = () => {
    let choice = window.confirm("Do you want to logout?");
    if (choice) setAuth(false);
  };

  return (
    <>
      <Navbar uname={uname} logout={check} />
      <div className="main-container">
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="password"
            placeholder="Ex. password123"
            name="pass"
            value={details.pass}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ex. Facebook"
            name="title"
            value={details.title}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className="add-password-btn">
            Add Password
          </button>
        </form>

        {loading ? (
          <p className="loading-message">Loading Passwords....</p>
        ) : list.length > 0 ? (
          <div className="Passwords">
            {list.map((val) => {
              return (
                <div className="password-container" key={val.id}>
                  <div
                    className="password-bar"
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
                    className="delete-btn"
                    onClick={() => deletePass(val.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-list-message">Password List Empty</p>
        )}
      </div>
    </>
  );
}

export default PassManager;
