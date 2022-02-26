import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PassManager from "./PassManager";
import "../css/index.css";
import { AuthProvider } from "../Contexts/AuthProvider";
import PasswordReset from "./PasswordReset";

function App() {
  const [token, setToken] = useState("");
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/signIn">
            <Login setToken={setToken} />
          </Route>
          <Route exact path="/passwordReset" component={PasswordReset} />
          <ProtectedRoutes
            component={PassManager}
            exact
            token={token}
            path="/passaver/:uname"
          />
          <Redirect path="*" to="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
