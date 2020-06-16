import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./homeMenu.css";

function HomeMenu() {
  const animation = useSpring({
    config: { duration: 500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div style={animation}>
      <div className="menu">
        <div className="jumbotron-style jumbotron ">
          <h1>Main Menu</h1>
        </div>
        <div className="container">
          <h2>Game Modes:</h2>
          <hr></hr>
          <div className="cards">
            <Link to="/10-second-game">
              <div className="card">
                Lolo
                <div className="card-body"></div>
              </div>
            </Link>
            <Link to="/typing-test">
              <div className="card shadow">
                Typing test
                <div className="card-body"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
export default HomeMenu;
