import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ uname, logout }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const Component = () => {
    return (
      <div className="flex flex-wrap py-2 md:px-3.5 ">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between py-3 rounded">
            <div className="container  mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start ">
                <img
                  className="inline-block w-8 xl:w-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="passaver-logo"
                />
                <button
                  className="text-white cursor-pointer text-xl leading-none  py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center " +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="px-4 list-none ml-auto ">
                  <li className="nav-item flex flex-col items-end w-28 pr-2.5 bg-blue-400 rounded-lg lg:flex-row lg:space-x-2 lg:rounded-none lg:bg-transparent lg:w-auto">
                    {/* <NavLink
                      className="py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/"
                    >
                      Profile
                    </NavLink> */}
                    {uname ? (
                      <button
                        type="button"
                        className=" py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <NavLink
                          className="py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          to="/"
                        >
                          Register
                        </NavLink>
                        <NavLink
                          className=" py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          to="/signIn"
                        >
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
