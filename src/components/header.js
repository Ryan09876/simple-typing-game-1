import React from "react";
import "./header.css";

const Header = (props) => {
  return (
    <div className="jumbotron-style jumbotron ">
      <div className="menu-header">
        <div>
          <h1>{props.title}</h1>
          <h5 style={{ color: "rgb(91, 161, 44)" }}>{props.info}</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
