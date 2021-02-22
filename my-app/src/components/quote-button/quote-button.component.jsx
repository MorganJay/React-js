import React from 'react';

import './quote-button.styles.css';

const QuoteButton = ({ ...otherProps}) => <button className="new-quote" {...otherProps}>New Quote</button>;

export default QuoteButton;
