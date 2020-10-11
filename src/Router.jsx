import React from "react";
import {Route, Switch} from "react-router";
import {Home, SignUp, SignIn} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signIn"} component={SignIn} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;