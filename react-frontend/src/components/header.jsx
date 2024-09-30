import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header(props) {
  return (
    <header>
      <Link className="logo-link" to={props.currentPath}>
        <h1>SSR Editor</h1>
      </Link>
    </header>
  );
}

Header.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Header;
