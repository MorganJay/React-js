import React, { useEffect, useState } from 'react';
import TwitterButton from '../twitter-button/twitter-button.component';
import QuoteButton from '../quote-button/quote-button.component';

import './card.styles.css';

const Card = () => {
  const [quotes, setQuotes] = useState([]);
  const [number, setRandomNumber] = useState(0);

  const getRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 2000));
  };

  // Fetch quote from API
  const getQuotes = async () => {
    const response = await fetch('https://type.fit/api/quotes');
    const data = response.json();
    return data;
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${this.state.quotes.content} - ${this.state.quotes.author}`;
    window.open(twitterUrl, '_blank');
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      const quotesFromApi = await getQuotes();
      setQuotes(quotesFromApi);
    };
    fetchQuotes();
    getRandomNumber();
  }, []);
  console.log(quotes);

  return (
    <div className="card">
      <div className="quote-container">
        <h3 className="quote">{quotes.length > 0 ? quotes[number].text : 'Loading'}</h3>
        <p className="author">{quotes.length > 0 ? quotes[number].author : 'Loading'}</p>
      </div>
      <div className="buttons-container">
        <TwitterButton />
        <QuoteButton onClick={getRandomNumber} />
      </div>
    </div>
  );
};

export default Card;
