import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

//styles
import {theme} from "./Common/Styles"

//redux
import store from "./Store";

//components
// import PrivateRoute from "./libs/PrivateRoute";
import Login from "./Component/Login";
import Signup from './Component/Signup';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact={true} path={"/"} component={Signup} />
              <Route exact={true} path={"/signup"} component={Login} />
              {/* <PrivateRoute path={"/"} component={Layout} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
