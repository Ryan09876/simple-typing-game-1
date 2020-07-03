import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./homeMenu.css";
import Div100vh from "react-div-100vh";
import Typical from "react-typical";
import { useState } from "react";
import { render } from "@testing-library/react";
import Header from "./components/header";

function HomeMenu() {
  const [isSlidingMenuOpen, setIsSlidingMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const animation = useSpring({
    config: { duration: 500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const handleOpeningSideMenu = () => {
    setIsSlidingMenuOpen(!isSlidingMenuOpen);
  };
  const enableClickingOutsideToCloseTheMenu = () => {
    if (isSlidingMenuOpen) {
      setIsSlidingMenuOpen(false);
    }
  };

  const settingsMenu = () => {
    return (
      <Div100vh
        className={
          isSlidingMenuOpen
            ? "menu-settings-sliding-menu-open"
            : "menu-settings-sliding-menu-closed"
        }
      >
        <Div100vh className="green-background"></Div100vh>
        <div className="sliding-menu-inside">
          <h3 style={{ "text-align": "center", color: "rgb(0, 118, 253)" }}>
            Info
          </h3>
          <hr></hr>
          <p>No info for now</p>
          <h3 style={{ "text-align": "center", color: "rgb(0, 118, 253)" }}>
            Contact
          </h3>
          <hr></hr>
          <p>
            This is the first project that I have ever made by my own, I'm sure
            I'll make it better with time, but for now if you have any sugestion
            <a
              className="info-links"
              href="mailto:anthony.fernandezz123@outlook.com"
            >
              _send me an eMail HERE_
            </a>
            I would appreciate it a lot :)
          </p>
          <p>
            If you know how to code you can check out the code if you want, its
            no where near "good code" but hey, it works
          </p>
          <a
            style={{ color: "white" }}
            href="https://github.com/anthony-fdez/simple-typing-game"
            target="blank"
          >
            <div className="github-link">
              <h4 style={{ margin: 0 }}>GitHub</h4>
            </div>
          </a>
        </div>
        <div
          onClick={handleOpeningSideMenu}
          className="menu-settings-button-sliding-menu"
        >
          <h2 className="menu-settings-button-text">Close</h2>
        </div>
      </Div100vh>
    );
  };

  useEffect(() => {
    renderTheAutoTyping();
  }, []);

  const renderTheAutoTyping = () => {
    return (
      <div className="auto-typer-div">
        <Typical
          wraper="b"
          steps={[
            "You'll have a lot of fun here!",
            4000,
            "And also learn to type faster!",
            4000,
            "You are going to type like a pro",
            4000,
            "Have fun!",
          ]}
        />
      </div>
    );
  };

  const homeMenuApp = () => {
    return (
      <div>
        {settingsMenu()}
        <Div100vh
          className={isSlidingMenuOpen ? "menu-open" : "menu-closed"}
          onClick={
            isSlidingMenuOpen ? enableClickingOutsideToCloseTheMenu : null
          }
        >
          <animated.div style={animation}>
            <Header
              title={"Simple Typing Game"}
              info={"Test your typing skill and have some fun!"}
            />
            <div
              onClick={handleOpeningSideMenu}
              className={
                isSlidingMenuOpen
                  ? "menu-settings-button-open"
                  : "menu-settings-button"
              }
            >
              <h2 className="menu-settings-button-text">About</h2>
            </div>
            {renderTheAutoTyping()}
            <div className="game-modes container">
              <div className="d-flex justify-content-center">
                <h2>Game Modes:</h2>
              </div>
              <hr></hr>
              <div className="cards">
                <Link className="link-menu" to="/10-second-game">
                  <div className="card">
                    <h4>10 second chalenge</h4>
                    <p>10 seconds, that's it...</p>
                  </div>
                </Link>
                <Link className="link-menu" to="/levels">
                  <div className="card">
                    <h4>Typing test</h4>
                    <p>Improve your typing skills!</p>
                  </div>
                </Link>
              </div>
            </div>
          </animated.div>
        </Div100vh>
      </div>
    );
  };
  return homeMenuApp();
}
export default HomeMenu;
