import { useEffect, useState } from 'react'
import CoinInfo from './Components/CoinInfo';
import SideNav from "./Components/SideNav";
import './App.css'

function App() {
  const [list, setList] = useState(null)
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchAllCoinData() {
      const response = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?api_key=' + API_KEY);
      const json = await response.json();
      setList(json);
    }

    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "" && list && list.Data) {
      const filteredData = Object.keys(list.Data).filter((item) => 
        // Search through the coin name and symbol
        list.Data[item].FullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        list.Data[item].Symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
  };

  console.log("List loaded:", !!list);
  console.log("Search input:", searchInput);
  console.log("Filtered results:", filteredResults.length);

  return(
    <div className="whole-page">
      {/* <SideNav /> */}
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((coin) => 
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={list.Data[coin].Symbol}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )
            : list && Object.entries(list.Data || {}).map(([coin, coinData]) => 
                coinData.PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={coinData.Symbol}
                    image={coinData.ImageUrl}
                    name={coinData.FullName}
                    symbol={coinData.Symbol}
                  />
                ) : null
              )
          }
        </ul>
    </div>
  )
}

export default App