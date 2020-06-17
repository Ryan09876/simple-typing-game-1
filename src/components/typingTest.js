import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./typingTest.css";

function TypingTest() {
  const [randomText, setRandomText] = useState("");
  const [randomTextArr, setRandomTextArr] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [countingUpSeconds, setCountingUpSeconds] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [textWordCountUp, setTextWordCountUp] = useState(0);
  const [randomWordSpace, setRandomWordSpace] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const selectRandomText = () => {
      let jsonText = require("./text.json");
      let random = Math.floor(
        Math.random() * Math.floor(jsonText.texts.length)
      );
      setRandomText(jsonText.texts[random]);
      let text = jsonText.texts[random];

      let array = [];
      let splitedText = text.split(" ");
      setRandomTextArr(splitedText);
      splitedText.map((word) => {
        let randomWord = word + " ";
        array.push(randomWord);
      });
      array.push(".");
      setRandomWordSpace(array);
    };
    selectRandomText();
  }, []);

  const checkForEqualWord = (e) => {
    if (randomWordSpace.length - 1 === textWordCountUp) {
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
      } else if (e.target.value !== randomTextArr[textWordCountUp]) {
        setIsEqual(false);
      }
    }
  };

  useEffect(() => {
    let intervalSeconds = null;

    if (isRunning) {
      intervalSeconds = setInterval(() => {
        setCountingUpSeconds((countingUpSeconds) => countingUpSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalSeconds);
    };
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

  const game = () => {
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
              onChange={checkForEqualWord}
              placeholder={"Start typing the text above!"}
              className="form-control"
              type="text"
            ></input>
          </form>
        </div>
      </div>
    );
  };

  const winScreen = () => {
    return (
      <div className="won-screen">
        <h1 className="won-text">You won!</h1>
      </div>
    );
  };

  return (
    <div className="typing-test">
      <animated.div style={animation}>
        <div className="typing-test-jumbotron jumbotron shadow">
          <h3>Typing Test</h3>
          <Link to="/">
            <button className="btn btn-light">Home</button>
          </Link>
        </div>
        {won ? winScreen() : game()}
        <div
          className={
            won ? "footer-won container-fluid" : "footer container-fluid"
          }
        >
          <div className={won ? "stats-won container" : "stats container"}>
            <h1>Hello</h1>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
export default TypingTest;
