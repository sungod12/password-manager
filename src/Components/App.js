import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PassManager from "./PassManager";
import Navbar from "./Navbar";

function App() {
  const [name, setName] = useState("");
  return (
    <BrowserRouter>
      <Navbar uname={name} />
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/signIn">
          <Login setUsername={setName} />
        </Route>
        <ProtectedRoutes
          component={PassManager}
          exact
          path="/passaver/:uname"
          setName={setName}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
