import React from "react";
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer>
      <p className="copyright">&copy; {props.authors}</p>
    </footer>
  );
}

Footer.propTypes = {
  authors: PropTypes.string.isRequired,
};

export default Footer;
