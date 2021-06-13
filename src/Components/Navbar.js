import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ uname, logout }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const Component = () => {
    return (
      <div className="navigation-container">
        <div className="w-full py-2.5">
          <nav className="nav-container ">
            <div className="nav-div">
              <div className="navigation">
                <img
                  className="nav-logo"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="passaver-logo"
                />
                <div className="flex items-center">
                  <p className="username">{uname}</p>
                  <button
                    className="menu-button"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {uname ? (
                      <p className="user-icon">{uname.substr(0, 1)}</p>
                    ) : (
                      <i className="fas fa-bars"></i>
                    )}
                  </button>
                </div>
              </div>
              <div
                className={
                  "sm:flex flex-grow items-center " +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="list">
                  <li className="nav-item navlink-list">
                    {uname ? (
                      <>
                        {/* <NavLink className="profile-link" to="/">
                          Profile
                        </NavLink> */}
                        <button
                          type="button"
                          className=" logout-button"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink className="register-link" to="/">
                          Register
                        </NavLink>
                        <NavLink className=" signin-link" to="/signIn">
                          Sign In
                        </NavLink>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  };

  return <Component />;
}

export default Navbar;
