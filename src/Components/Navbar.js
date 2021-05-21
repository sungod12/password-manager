import React from "react";
import  {NavLink} from "react-router-dom";

function Navbar() {
  return (
    <div className="p-5 flex justify-between font-semibold text-white">
      <p>Home</p>
      <div>
        <NavLink to="/" activeClassName="font-semibold" className="mr-2.5 ">
          Register
        </NavLink>
        <NavLink
          to="/signIn"
          activeClassName="font-semibold"
          className="ml-auto"
        >
          SignIn
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
