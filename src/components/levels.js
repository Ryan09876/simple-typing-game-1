import React, { useEffect, useState } from "react";
import "./levels.css";
import Div100vh from "react-div-100vh";
import Header from "./header";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Levels = () => {
  const [isSlidingMenuOpen, setIsSlidingMenuOpen] = useState(false);
  const [text, setText] = useState();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    let texts = require("./text.json");
    setText(texts.texts);

    let titlesArray = [];
    let titles = texts.texts.map((title, index) => {
      titlesArray.push(title.title);
    });
    setTitles(titlesArray);
  }, []);

  const animation = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const renderAllTheCards = () => {
    if (text !== undefined) {
      return (
        <div className="grid-div container-fluid">
          <ul className="grid">
            {text.map((info, index) => {
              let wordLenght = info.text;
              wordLenght = wordLenght.split(" ");
              wordLenght = wordLenght.length;
              return (
                <Link
                  key={index}
                  to={`/levels/${info.title.split(" ").join("")}`}
                >
                  <div className={"card-container"} key={index}>
                    <div className="image-box">
                      <img
                        className="grid-image"
                        src={info.imageURL}
                        alt={`Image: ${info.title}`}
                      ></img>
                    </div>
                    <div className="content">
                      <div>
                        <h4 style={{ color: "white" }}>{info.title}</h4>
                      </div>
                      <div>
                        <h5 style={{ color: "white" }}>{wordLenght} words</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const handleOpeningSideMenu = () => {
    setIsSlidingMenuOpen(!isSlidingMenuOpen);
  };
  const enableClickingOutsideToCloseTheMenu = () => {
    if (isSlidingMenuOpen) {
      setIsSlidingMenuOpen(false);
    }
  };

  return (
    <div className="levels">
      <div
        className={
          isSlidingMenuOpen ? "quick-menu-div-shown" : "quick-menu-div-hidden"
        }
      >
        <div>
          <h4 style={{ fontSize: "2rem", marginTop: "1.5rem" }}>Shortcuts</h4>
          <Link className="quick-menu-random-link" to="/levels/random-quote">
            <div className="quick-menu-random-div">
              <h5>Random Quote</h5>
            </div>
          </Link>
          <hr></hr>
          <div>
            <ul
              style={{
                padding: 0,
                margin: 0,
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              {titles.map((info, index) => {
                return (
                  <Link key={index} to={`/levels/${info.split(" ").join("")}`}>
                    <div className="quick-list-item">
                      <div className="quick-list-div"></div>
                      <li className="li-list">{info}</li>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div onClick={handleOpeningSideMenu} className="close-button">
            <h4>X</h4>
          </div>
        </div>
      </div>
      <div
        onClick={enableClickingOutsideToCloseTheMenu}
        className={isSlidingMenuOpen ? "levels-open" : "levels-closed"}
      >
        <animated.div style={animation}>
          <Header
            homeBotton={true}
            title={"Levels"}
            info={"Select what story you want to parctice your typing on!"}
          ></Header>
          <div
            onClick={handleOpeningSideMenu}
            className="open-quick-menu-button"
          >
            <h4>Quick menu</h4>
          </div>
          <Link style={{ color: "white" }} to="/levels/random-quote">
            <div className="random-quote container">
              <h5>Type a random quote!</h5>
            </div>
          </Link>

          <div className="levels-hr container-fluid">
            <h2>Levels</h2>
            <hr></hr>
          </div>
          <div>{renderAllTheCards()}</div>
        </animated.div>
      </div>
    </div>
  );
};

export default Levels;
