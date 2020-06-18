import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./index.css";
import Game10second from "./game10seconds";
import HomeMenu from "./homeMenu";
import TypintTest from "./components/typingTest";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeMenu />
        </Route>
        <Route path="/10-second-game">
          <Game10second />
        </Route>
        <Route>
          <TypintTest />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
