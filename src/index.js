import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

//Pages
import Game10second from "./game10seconds";
import HomeMenu from "./homeMenu";
import TypintTest from "./components/typingTest";
import Levels from "./components/levels";
import RandomQuote from "./components/randomQuote";

let info = require("./components/text.json");

let infoArray = [];
info.texts.map((title, index) => {
  let routeLinks = title.title.split(" ").join("");
  infoArray.push(routeLinks);
});

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
        <Route exact path="/levels">
          <Levels />
        </Route>
        {infoArray.map((title, index) => {
          return (
            <Route key={index} path={`/levels/${title}`}>
              <TypintTest
                text={info.texts[index].text}
                imageURL={info.texts[index].imageURL}
                title={info.texts[index].title}
              />
            </Route>
          );
        })}
        <Route path="/levels/random-quote">
          <RandomQuote />
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
