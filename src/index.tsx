import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { HashRouter,Switch,Route,Redirect} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RTLLayout from "./layouts/rtl";
import Homepage from "layouts/Homepage";
import SignUp from "views/auth/signUp";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import SignIn from "views/auth/signIn";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route path={`/home`} component={Homepage} />
          <Route path={`/login`} component={SignIn} />
          <Route path={`/register`} component={SignUp} />
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Route path="/" render={() => <Redirect to="/login" />} />
          {/* <redirectedirect from="/" to="/login" /> */}
        </Switch>
      </HashRouter> 
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
