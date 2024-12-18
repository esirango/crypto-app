import React, { useEffect, useState } from "react";

import { searchCoin } from "../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";

import styles from "./search.module.css";

function Search({ setCurrency, currentCoin, setCurrentCoin }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);

    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.error);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {text && (
        <div className={styles.searchResults}>
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <RotatingLines
                width="50px"
                height="50px"
                strokeColor="#3874ff"
                strokeWidth="2"
              />
            </div>
          )}
          <ul>
            {coins.map((coin) => (
              <li
                key={coin.id}
                onClick={() => {
                  setCurrentCoin(coin.id);
                  setText(null);
                }}
              >
                <img src={coin.thumb} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
