import React from "react";

import TableData from "./TableData";
import { RotatingLines } from "react-loader-spinner";

import styles from "./tableCoin.module.css";

function TableCoin({ coins, isLoading, currency, setChart, currentCoin }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableData
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
                currentCoin={currentCoin}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;
