import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  const homeMenu = () => {
    if (props.homeBotton === true) {
      return <div className="home-botton">Home</div>;
    }
  };
  return (
    <div className="jumbotron-style jumbotron ">
      <div className="menu-header">
        <div>
          <div className="header-h1-div">
            <h1>{props.title}</h1>
            <Link style={{ color: "white" }} to="/">
              {homeMenu()}
            </Link>
          </div>

          <h5 style={{ color: "rgb(91, 161, 44)" }}>{props.info}</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
