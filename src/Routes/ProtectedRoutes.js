import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoutes({ isAuth,component: Component, ...rest }) {
  const storage=localStorage.getItem("authorized");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (storage) {
          return <Component setAuthorized={rest.setAuthorized}/>
        } else {
          return <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
        }
      }}
    />
  );
}

export default ProtectedRoutes;
