import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Div100vh from "react-div-100vh";
import "./typingTest.css";

function TypingTest(props) {
  const [isSlidingMenuOpen, setIsSlidingMenuOpen] = useState(false);
  //const [randomText, setRandomText] = useState("");
  const [randomTextArr, setRandomTextArr] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [countingUpSeconds, setCountingUpSeconds] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [textWordCountUp, setTextWordCountUp] = useState(0);
  const [randomWordSpace, setRandomWordSpace] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [won, setWon] = useState(false);
  const [repeatGame, setRepeatGame] = useState(false);
  const [nextText, setNextText] = useState(false);
  const [progresPercent, setProgresPercent] = useState(0);
  const [allLevelsTitles, setAllLevesTitles] = useState([]);
  const [allCharactersArray, setAllCharactersArray] = useState([]);
  //const [inputCharacters, setInputCharacters] = useState([]);
  //const [styleCharacter, setStyleCharacter] = useState([]);
  //const [spanArray, setSpanArray] = useState();

  useEffect(() => {
    if (nextText) {
      setNextText(false);
    }
    const selectRandomText = () => {
      let text = props.text;
      let array = [];
      let splitedText = text.split(" ");
      setRandomTextArr(splitedText);
      splitedText.map((word) => {
        let randomWord = word + " ";
        return array.push(randomWord);
      });
      array.push(".");
      setRandomWordSpace(array);
    };
    selectRandomText();

    let arrayOfCharacters = [];
    props.text.split("").forEach((character) => {
      arrayOfCharacters.push(character);
    });
    setAllCharactersArray(arrayOfCharacters);

    //start the game over when the text is changed
    setIsRunning(false);
    setProgresPercent(0);
    setWPM(0);
    setCountingUpSeconds(0);
    setTextWordCountUp(0);
  }, [props, nextText]);

  useEffect(() => {
    let percent = textWordCountUp / randomWordSpace.length;
    percent *= 100;
    setProgresPercent(percent);
  }, [textWordCountUp]);

  const handleOpeningSideMenu = () => {
    setIsSlidingMenuOpen(!isSlidingMenuOpen);
  };
  const enableClickingOutsideToCloseTheMenu = () => {
    if (isSlidingMenuOpen) {
      setIsSlidingMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      let intervalSeconds = null;

      if (isRunning) {
        intervalSeconds = setInterval(() => {
          setCountingUpSeconds((countingUpSeconds) => countingUpSeconds + 1);
        }, 1000);
      }
      return () => {
        clearInterval(intervalSeconds);
      };
    }
  }, [countingUpSeconds, isRunning]);

  const animation = useSpring({
    config: { duration: 500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const selectClassName = () => {
    if (isEqual) {
      return "word-preview-text-1-equal";
    } else if (isWrong) {
      return "word-preview-text-1-wrong";
    } else return "word-preview-text-1";
  };

  useEffect(() => {
    const calculateWordPerMinute = () => {
      if (isRunning) {
        let wordsPerMinute = (textWordCountUp / countingUpSeconds) * 60;
        wordsPerMinute = wordsPerMinute.toFixed([1]);
        setWPM(wordsPerMinute);
      }
    };
    calculateWordPerMinute();
  }, [textWordCountUp, isRunning]);

  const repeatSameText = () => {
    setRepeatGame(true);
    setIsRunning(false);
    setWon(false);
    setCountingUpSeconds(0);
    setWPM(0);
    setTextWordCountUp(0);
  };

  const newText = () => {
    setNextText(true);
    setRepeatGame(true);
    setIsRunning(false);
    setWon(false);
    setTextWordCountUp(0);
    setWPM(0);
    setTextWordCountUp(0);
  };

  const checkForEqualWord = (e) => {
    if (repeatGame) {
      e.target.value = "";
      setRepeatGame(false);
    }
    if (randomWordSpace.length - 1 === textWordCountUp) {
      setIsRunning(false);
      setWon(true);
    } else {
      if (isRunning) {
        if (e.target.value === randomWordSpace[textWordCountUp]) {
          e.target.value = "";
          setIsEqual(false);
          setIsWrong(false);
          setTextWordCountUp((textWordCountUp) => {
            return textWordCountUp + 1;
          });
        }
      } else if (isRunning === false) {
        if (e.target.value === randomWordSpace[0]) {
          setIsRunning(true);
          e.target.value = "";
          setIsEqual(false);
          setIsWrong(false);
          setTextWordCountUp((textWordCountUp) => {
            return textWordCountUp + 1;
          });
        }
      }
      let word = e.target.value;
      if (e.target.value === randomTextArr[textWordCountUp]) {
        setIsEqual(true);
      } else if (word.length > randomTextArr[textWordCountUp].length - 1) {
        setIsWrong(true);
      } else if (word.length !== randomTextArr[textWordCountUp].length) {
        setIsWrong(false);
        setIsEqual(false);
      } else {
        setIsEqual(false);
      }
    }

    // if (allCharactersArray !== undefined) {
    //   if (
    //     styleCharacter[e.target.value.length - 1] === "equal" ||
    //     styleCharacter[e.target.value.length - 1] === "not equal"
    //   ) {
    //     let array = styleCharacter;
    //     array[e.target.value.length] = "null";
    //     setStyleCharacter(array);
    //   } else if (
    //     e.target.value[e.target.value.length - 1] ===
    //     allCharactersArray[e.target.value.length - 1]
    //   ) {
    //     let array = styleCharacter;
    //     array[e.target.value.length - 1] = "equal";
    //     setStyleCharacter(array);
    //   } else if (
    //     e.target.value[e.target.value.length - 1] !==
    //     allCharactersArray[e.target.value.length - 1]
    //   ) {
    //     let array = styleCharacter;
    //     array[e.target.value.length - 1] = "not equal";
    //     setStyleCharacter(array);
    //   }

    //   if (
    //     e.target.value[e.target.value.length - 1] ===
    //     allCharactersArray[e.target.value.length - 1]
    //   ) {
    //     let newArray = spanArray;
    //     newArray[e.target.value.length - 1].props.className = 1;
    //     setSpanArray(newArray);
    //   }
    // }
  };

  // useEffect(() => {
  //   if (allCharactersArray !== undefined) {
  //     let array = [];
  //     for (let i = 0; i < allCharactersArray.length; i++) {
  //       array.push(null);
  //     }
  //     setStyleCharacter(array);
  //   }
  // }, [allCharactersArray]);

  // useEffect(() => {
  //   let array = allCharactersArray.map((character, index) => {
  //     return (
  //       <span className="lola" key={index}>
  //         {character}
  //       </span>
  //     );
  //   });
  //   setSpanArray(array);
  // }, [styleCharacter]);

  const game = () => {
    if (allCharactersArray !== undefined) {
      return (
        <div>
          <div className="text-to-type container">{randomWordSpace}</div>
          <div className="word-preview-container container">
            <h4 className={selectClassName()}>
              {randomWordSpace[textWordCountUp]}
            </h4>
            <h4 className="word-preview-text-2">
              {randomWordSpace[textWordCountUp + 1]}
            </h4>
            <h4 className="word-preview-text-3">
              {randomWordSpace[textWordCountUp + 2]}
            </h4>
            <h4 className="word-preview-text-4">
              {randomWordSpace[textWordCountUp + 3]}
            </h4>
            <h4 className="word-preview-text-5">
              {randomWordSpace[textWordCountUp + 4]}
            </h4>
            <h4 className="word-preview-text-6">
              {randomWordSpace[textWordCountUp + 5]}
            </h4>
            <h4 className="word-preview-text-6">...</h4>
          </div>
          <div className="input-field container">
            <form>
              <input
                autoFocus
                spellCheck="true"
                autoComplete="on"
                autoCorrect="on"
                autoCapitalize="off"
                onChange={checkForEqualWord}
                placeholder={"Start typing the text above!"}
                className="form-control"
                type="text"
              ></input>
            </form>
          </div>
          <div className="container-fluid">
            <div
              className="progress-bar-out container-fluid"
              style={isRunning ? { opacity: 1 } : { opacity: 0 }}
            >
              <div
                className="progress-bar-in container-fluid"
                style={{ width: `${progresPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
  };

  const typingTestFooter = () => {
    return (
      <div
        className={
          won ? "footer-won container-fluid" : "footer container-fluid"
        }
      >
        <div className={won ? "stats-won container" : "stats container"}>
          <Link to="/levels" style={{ color: "white" }}>
            <div className="icon">
              <div className="next-icon">
                <i className="fas fa-arrow-left fa-2x"></i>
              </div>
            </div>
          </Link>

          <div className="aling-flex">
            <div className="mr-4">
              <p className="wpm-time">
                WPM:{" "}
                {countingUpSeconds < 3 || textWordCountUp < 4 ? "..." : wpm}
              </p>
            </div>
            <div>
              <p className="wpm-time">Time: {countingUpSeconds}s</p>
            </div>
          </div>
          <div className="icon ml-4" onClick={repeatSameText}>
            <div className="repeat-icon">
              <i class="fas fa-undo-alt fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const winScreen = () => {
    return (
      <div className="won-screen">
        <h1 className="won-text">Good job!</h1>
      </div>
    );
  };

  useEffect(() => {
    let text = require("./text.json");
    setAllLevesTitles(text.texts);
  }, []);

  return (
    <div>
      <div
        className={
          isSlidingMenuOpen
            ? "typing-game-menu-div-shown"
            : "typing-game-menu-div-hidden"
        }
      >
        <div>
          <h4 style={{ fontSize: "2rem", marginTop: "1.5rem", color: "white" }}>
            Shortcuts
          </h4>
          <Link className="quick-menu-random-link" to="/levels/random-quote">
            <div className="quick-menu-random-div">
              <h5>Random Quote</h5>
            </div>
          </Link>
          <hr></hr>
          <div>
            <ul
              style={{
                color: "white",
                padding: 0,
                margin: 0,
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              {allLevelsTitles.map((info, index) => {
                let isActive = false;
                if (props.title === allLevelsTitles[index].title) {
                  isActive = true;
                }
                return (
                  <Link
                    key={index}
                    to={`/levels/${info.title.split(" ").join("")}`}
                  >
                    <div
                      className={
                        isActive
                          ? "typing-test-quick-list-item-active"
                          : "typing-test-quick-list-item"
                      }
                    >
                      <div className="typing-test-quick-list-div"></div>
                      <li className="typing-test-li-list">{info.title}</li>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <animated.div
        style={{ backgroundImage: `url(${props.imageURL})` }}
        className="background-image"
      ></animated.div>
      <Div100vh
        onClick={enableClickingOutsideToCloseTheMenu}
        className={
          isSlidingMenuOpen
            ? "typing-test-levels-open"
            : "typing-test-levels-closed"
        }
      >
        <animated.div style={animation}>
          <div className="typing-test-jumbotron jumbotron shadow">
            <h3>{props.title}</h3>
            <div className="home-levels-div">
              <Link to="/">
                <div className="home-button">Home</div>
              </Link>
              <div onClick={handleOpeningSideMenu} className="levels-button">
                Levels
              </div>
            </div>
          </div>
          {won ? winScreen() : game()}
          {typingTestFooter()}
        </animated.div>
      </Div100vh>
    </div>
  );
}
export default TypingTest;
