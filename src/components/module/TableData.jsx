import React from "react";

import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

import styles from "./tableCoin.module.css";
import { getMarketChart } from "../services/cryptoApi";

function TableData({ currency, setChart, coin }) {
  const {
    id: coin_name,
    image,
    name,
    symbol,
    current_price,
    market_cap_change_percentage_24h: market_cap,
    total_volume,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(getMarketChart(coin_name));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <>
      <tr>
        <td>
          <div className={styles.symbol} onClick={showHandler}>
            <img src={image} />
            <span>{symbol.toUpperCase()}</span>
          </div>
        </td>
        <td>{name}</td>
        <td>
          {current_price.toLocaleString()}
          {currency === "usd" && "$"}
        </td>
        <td className={market_cap > 0 ? styles.success : styles.error}>
          {market_cap.toFixed(2)} %
        </td>
        <td>{total_volume}</td>
        <td>
          {market_cap > 0 ? <img src={chartUp} /> : <img src={chartDown} />}
        </td>
      </tr>
    </>
  );
}

export default TableData;
