import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import "./App.css";

import Input from "./components/input";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(1); // easy: 2seconds, normal: 1second, harn 0.4seconds
  const [language, setLanguage] = useState(true); // TRUE is Englis, FALSE is spanish

  /*================== Fading in animation ==================*/
  //testing comment

  const props = useSpring({
    config: { duration: 1000 },
    opacity: 1,
    from: { opacity: 0 },
  });

  /*================== Change the theme of the sliding menu ==================*/

  const changeModeOfSlidingMenu = () => {
    if (isMenuInScreen && darkMode) {
      return "shown-sliding-menu-dark";
    } else if (isMenuInScreen && darkMode === false) {
      return "shown-sliding-menu-light";
    } else return "hidden-sliding-menu";
  };

  /*================== Change the dificylte button colors ==================*/

  const changeDificultyButtonColors = (isDeficultyEqual) => {
    if (darkMode && dificulty === isDeficultyEqual) {
      return "dificulty-button btn btn-success m-1";
    } else if (darkMode === false && dificulty === isDeficultyEqual) {
      return "dificulty-button btn btn-success m-1";
    } else if (darkMode) {
      return "dificulty-button btn btn-light m-1";
    } else if (darkMode === false) {
      return "dificulty-button btn btn-dark m-1";
    }
  };

  /*================== Sliding Menu ==================*/

  function slidingMenu() {
    return (
      <div className={changeModeOfSlidingMenu()}>
        <div>
          <div className="sliding-menu-top-settings">
            <h1>{language ? "Settings" : "Ajustes"}</h1>
            <div
              className={darkMode ? "back-arrow-dark" : "back-arrow-light"}
              onClick={() => setIsMenuInScreen(!isMenuInScreen)}
            >
              <i className="fas fa-arrow-right fa-2x"></i>
            </div>
          </div>
          <hr className={darkMode ? "hr-white" : "hr-dark"}></hr>
          <div className={darkMode ? "settings-dark" : "settings-light"}>
            <h5 className="m-0">{language ? "Dark Mode:" : "Modo Oscuro:"}</h5>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className={darkMode ? "btn btn-success" : "btn btn-danger"}
            >
              {darkMode ? "On!" : "Off"}
            </button>
          </div>
          <div className={darkMode ? "settings-dark" : "settings-light"}>
            <h5 className="m-0">{language ? "Language:" : "Idioma:"}</h5>
            <button
              onClick={() => {
                setLanguage(!language);
              }}
              className={darkMode ? "btn btn-light" : "btn btn-dark"}
            >
              {language ? "Eng" : "Esp"}
            </button>
          </div>
          <div
            className={
              darkMode ? "settings-dificult-dark" : "settings-dificult-light"
            }
          >
            <div>
              <h5>{language ? "Dificulty:" : "Dificultad:"}</h5>
            </div>
            <div className="dificulty-buttons">
              <button
                onClick={() => {
                  setDificulty(2);
                }}
                className={changeDificultyButtonColors(2)}
              >
                {language ? "Easy" : "Facil"}
              </button>
              <button
                onClick={() => {
                  setDificulty(1);
                }}
                className={changeDificultyButtonColors(1)}
              >
                {language ? "Normal" : "Normal"}
              </button>
              <button
                onClick={() => {
                  setDificulty(0.5);
                }}
                className={changeDificultyButtonColors(0.5)}
              >
                {language ? "Hard" : "Dificil"}
              </button>
            </div>
          </div>
          <a
            className="github"
            href="https://github.com/anthony-fdez/simple-typing-game"
            target="blank"
          >
            <div
              className={
                darkMode
                  ? "footer-dark settings-dark"
                  : "footer-light settings-light"
              }
            >
              <h5 className="m-0">GitHub:</h5>
              <i className="fab fa-github g fa-2x"></i>
            </div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <animated.div style={props}>
      <div>{slidingMenu()}</div>
      <div>
        <div className={darkMode ? "dark-mode" : "light-mode"}>
          <div
            className={
              darkMode
                ? "transition App p-3 container bg-dark "
                : "transition App p-3 container bg-primary text-white"
            }
          >
            <div className="title ">
              <h1>{language ? "Typing game!" : "Escribidor!"}</h1>
            </div>
            <div>
              <div
                onClick={() => setIsMenuInScreen(!isMenuInScreen)}
                className="settings-button"
              >
                <i class="fas fa-cog fa-2x"></i>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setIsMenuInScreen(false);
            }}
          >
            <div className="container mt-5">
              <Input
                dificulty={dificulty}
                language={language}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
  
}


export default App;

