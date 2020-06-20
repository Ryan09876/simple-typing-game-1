import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Div100vh from "react-div-100vh";
import "./typingTest.css";

function TypingTest(props) {
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
  const [repeatGame, setRepeatGame] = useState(false);
  const [nextText, setNextText] = useState(false);
  const [progresPercent, setProgresPercent] = useState(0);

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
        array.push(randomWord);
      });
      array.push(".");
      setRandomWordSpace(array);
    };
    selectRandomText();
  }, [nextText]);

  useEffect(() => {
    let percent = textWordCountUp / randomWordSpace.length;
    percent *= 100;
    setProgresPercent(percent);
  }, [textWordCountUp]);

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

  const game = () => {
    return (
      <div>
        <div className="text-to-type container">
          <p>{randomWordSpace}</p>
        </div>
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
        <div className="container">
          <div
            className="progress-bar-out container"
            style={isRunning ? { opacity: 1 } : { opacity: 0 }}
          >
            <div
              className="progress-bar-in container"
              style={{ width: `${progresPercent}%` }}
            ></div>
            <p className="word-count">
              {textWordCountUp} / {randomTextArr.length} words
            </p>
          </div>
        </div>
      </div>
    );
  };

  const typingTestFooter = () => {
    return (
      <div
        className={
          won ? "footer-won container-fluid" : "footer container-fluid"
        }
      >
        <div className={won ? "stats-won container" : "stats container"}>
          <div className="icon" onClick={repeatSameText}>
            <div className="repeat-icon">
              <i className="fas fa-undo-alt fa-2x"></i>
            </div>
          </div>
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

          <div className="icon ml-4" onClick={newText}>
            <div className="next-icon">
              <i className="fas fa-arrow-right fa-2x"></i>
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

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${props.imageURL})` }}
        className="background-image"
      ></div>
      <Div100vh className="typing-test">
        <animated.div style={animation}>
          <div className="typing-test-jumbotron jumbotron shadow">
            <h3>{props.title}</h3>
            <Link to="/">
              <button className="btn btn-light">Home</button>
            </Link>
          </div>
          {won ? winScreen() : game()}
          {typingTestFooter()}
        </animated.div>
      </Div100vh>
    </div>
  );
}
export default TypingTest;
