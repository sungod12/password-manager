import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PassManager from "./PassManager";
import "./css/index.css";
import { AuthProvider } from "../Contexts/AuthProvider";
import PasswordReset from "./PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/signIn" component={Login} />
          <Route exact path="/passwordReset" component={PasswordReset} />
          <ProtectedRoutes
            component={PassManager}
            exact
            path="/passaver/:uname"
          />
          <Redirect path="*" to="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
