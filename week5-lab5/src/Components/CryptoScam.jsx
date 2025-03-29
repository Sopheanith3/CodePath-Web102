import React, { useEffect, useState } from "react";

const CryptoScam = () => {
  const [scamList, setScamList] = useState(null);

  useEffect(() => {
    async function fetchScamData() {
      const response = await fetch("https://api.cryptoscamdb.org/v1/scams");
      const json = await response.json();
      setScamList(json);
    }

    fetchScamData().catch(console.error);
  }, []);

  return (
    <div className="scam-list">
      <h2>Recent Crypto Scams</h2>
      {scamList && scamList.result && (
        <ul>
          {Object.keys(scamList.result).slice(0, 10).map((scam, index) => (
            <li key={index} className="scam-item">
              <h3>{scamList.result[scam].name || "Unknown Scam"}</h3>
              <p>Type: {scamList.result[scam].type || "Unknown Type"}</p>
              <p>
                Status: <span className="status-active">{scamList.result[scam].status || "Unknown"}</span>
              </p>
              {scamList.result[scam].coin && (
                <p>Coin: {scamList.result[scam].coin}</p>
              )}
              {scamList.result[scam].url && (
                <p>
                  URL: <span className="scam-url">{scamList.result[scam].url}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoScam;