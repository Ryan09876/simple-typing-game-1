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
      splitedText.map((word) => {
        let randomWord = word + " ";
        array.push(randomWord);
      });
      setRandomWordSpace(array);
    };
    selectRandomText();
  }, []);

  const checkForEqualWord = (e) => {
    if (isRunning) {
      if (e.target.value === randomWordSpace[textWordCountUp]) {
        e.target.value = "";
        setTextWordCountUp((textWordCountUp) => {
          return textWordCountUp + 1;
        });
      }
    } else if (isRunning === false) {
      if (e.target.value === randomWordSpace[0]) {
        setIsRunning(true);
        e.target.value = "";
        setTextWordCountUp((textWordCountUp) => {
          return textWordCountUp + 1;
        });
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

  //   useEffect(() => {
  //     const displayTheText = () => {
  //       let array = randomWordSpace;
  //       for (let i = 0; i < array.length; i++) {
  //         return <p className={`word${i}`}>{array[i]}</p>;
  //       }
  //     };
  //   }, [textWordCountUp]);

  return (
    <animated.div style={animation}>
      <div className="typing-test">
        <div className="typing-test-jumbotron jumbotron shadow">
          <h1>Typing Test</h1>
          <Link to="/">
            <button className="btn btn-light">Home</button>
          </Link>
        </div>
        <div className="text-to-type container">{randomWordSpace}</div>
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
        {countingUpSeconds}
      </div>
    </animated.div>
  );
}
export default TypingTest;
