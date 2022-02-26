import React from "react";
import RForm from "./RForm";

function Login({ setToken }) {
  return (
    <RForm btnName="Sign In" setToken={setToken} setFunction="Sign in to" />
  );
}

export default Login;
