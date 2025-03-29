import React, { useEffect, useState } from "react";

const CoinInfo = ({ image, name, symbol }) => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function getCoinPrice() {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
      }
    }
    getCoinPrice();
  }, [symbol, API_KEY]);

  // Don't render anything if price isn't loaded yet
  if (!price) {
    return null;
  }

  return (
    <li className="main-list" key={symbol}>
      <img
        className="icons"
        src={`https://www.cryptocompare.com${image}`}
        alt={`Small icon for ${name} crypto coin`}
      />
      {name} <span className="tab"></span> ${price.USD} USD
    </li>
  );
};

export default CoinInfo;