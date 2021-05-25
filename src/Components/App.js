import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PassManager from "./PassManager";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/signIn" component={Login}/>
        <ProtectedRoutes
          component={PassManager}
          exact
          path="/passaver/:uname"
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
