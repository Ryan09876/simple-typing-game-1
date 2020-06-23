import React, { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./randomQuote.css";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
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

  useEffect(() => {
    let randomQuotes = require("./randomQuote.json");
    let randomQuoteArray = randomQuotes.quoutes;
    let randomNumber = Math.floor(Math.random() * randomQuoteArray.length);
    setQuote(randomQuoteArray[randomNumber]);

    const selectRandomText = () => {
      let text = randomQuoteArray[randomNumber].quote;
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

    //start the game over when the text is changed
    setIsRunning(false);
    setProgresPercent(0);
    setWPM(0);
    setCountingUpSeconds(0);
    setTextWordCountUp(0);
    selectRandomText();
  }, [won]);

  useEffect(() => {
    let percent = textWordCountUp / randomWordSpace.length;
    percent *= 100;
    setProgresPercent(percent);
  }, [textWordCountUp]);

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

      let wordLength = e.target.value.length;

      if (e.target.value === randomTextArr[textWordCountUp]) {
        setIsEqual(true);
      } else if (wordLength > randomTextArr[textWordCountUp].length - 1) {
        setIsWrong(true);
      } else if (wordLength !== randomTextArr[textWordCountUp].length) {
        setIsWrong(false);
        setIsEqual(false);
      } else {
        setIsEqual(false);
      }
    }
  };

  const winScreen = () => {
    return (
      <div className="won-screen">
        <p className="won-text">"{quote.quote}"</p>
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

  const game = () => {
    if (allCharactersArray !== undefined) {
      return (
        <div>
          <div className="author-div container">
            <h2 className="author-text">{quote.author}</h2>
            <hr></hr>
          </div>
          <div className="text-to-type container">{randomWordSpace}</div>
          <div className="word-preview-container-quote container">
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
                autoFocus
                spellCheck="true"
                autoComplete="on"
                autoCorrect="on"
                autoCapitalize="off"
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

  return (
    <div>
      <animated.div className="background-image"></animated.div>
      <Div100vh>
        <animated.div style={animation}>
          <div className="typing-test-jumbotron jumbotron shadow">
            <h3>Awesome Quotes</h3>
            <div className="home-levels-div">
              <Link to="/">
                <div className="home-button">Home</div>
              </Link>
            </div>
          </div>

          {won ? winScreen() : game()}
          {typingTestFooter()}
        </animated.div>
      </Div100vh>
    </div>
  );
};

export default RandomQuote;
