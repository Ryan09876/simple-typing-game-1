import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./homeMenu.css";
import Div100vh from "react-div-100vh";

function HomeMenu() {
  const animation = useSpring({
    config: { duration: 500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Div100vh className="menu">
      <animated.div style={animation}>
        <div className="jumbotron-style jumbotron ">
          <h1>Main Menu</h1>
        </div>
        <div className="container">
          <h2>Game Modes:</h2>
          <hr></hr>
          <div className="cards">
            <Link className="link-menu" to="/10-second-game">
              <div className="card">
                <h4>10 second chalenge</h4>
                <p>How many words can you type in 10 seconds?</p>
              </div>
            </Link>
            <Link className="link-menu" to="/typing-test">
              <div className="card">
                <h4>Typing test</h4>
                <p>Improve your typing skills!</p>
              </div>
            </Link>
          </div>
        </div>
      </animated.div>
    </Div100vh>
  );
}
export default HomeMenu;
