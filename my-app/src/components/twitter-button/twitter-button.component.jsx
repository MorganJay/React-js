import React from 'react';

import './twitter-button.styles.css'

const TwitterButton = ({ ...otherProps}) => {
  let buttonText = 'Share';
  return (
    <button className="twitter-button" {...otherProps}>
      <i className="fa fa-twitter" aria-hidden="true"></i>
      {buttonText}
    </button>
  );
};

export default TwitterButton;
