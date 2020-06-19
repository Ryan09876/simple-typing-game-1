import React, { useEffect, useState } from "react";
import "./levels.css";
import Div100vh from "react-div-100vh";
import Header from "./header";
import { useSpring, animated } from "react-spring";

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
                <div className={"card-container"} key={index}>
                  <div className="image-box">
                    <img className="grid-image" src={info.imageURL}></img>
                  </div>
                  <div className="content">
                    <div>
                      <h4 style={{ color: "rgb(91, 161, 44)" }}>
                        {info.title}
                      </h4>
                    </div>
                    <div>
                      <h5>{wordLenght} words</h5>
                    </div>
                  </div>
                </div>
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
          <div>
            <ul
              style={{
                padding: 0,
                margin: 0,
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[0]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[1]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[2]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[3]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[4]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[5]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[6]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[7]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[8]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[9]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[12]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[13]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[14]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[15]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[16]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[17]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[18]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[19]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[20]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[21]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[22]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[23]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[24]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[25]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[26]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[27]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[28]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[29]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[30]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[31]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[32]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[33]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[34]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[35]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[36]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[37]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[38]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[39]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[40]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[41]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[42]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[43]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[44]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[45]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[46]}</li>
              </div>
              <div className="quick-list-item">
                <div className="quick-list-div"></div>
                <li className="li-list">{titles[47]}</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div
        onClick={enableClickingOutsideToCloseTheMenu}
        className={isSlidingMenuOpen ? "levels-open" : "levels-closed"}
      >
        <animated.div style={animation}>
          <Header
            title={"Levels"}
            info={"Select what story you want to parctice your typing on!"}
          ></Header>
          <div
            onClick={handleOpeningSideMenu}
            className="open-quick-menu-button"
          >
            <h4>Quick menu</h4>
          </div>
          <div>{renderAllTheCards()}</div>
        </animated.div>
      </div>
    </div>
  );
};

export default Levels;
