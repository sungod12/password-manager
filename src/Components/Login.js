import React from "react";
import RForm from "./RForm";


function Login({setUsername}) {
  return <RForm btnName="SignIn" setFunction="Sign in to" setName={setUsername}/>
}

export default Login;
