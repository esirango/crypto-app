import React, { useState } from "react";

import styles from "./chart.module.css";
import { convertData } from "../helpers/convertData";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

function Chart({ setChart, chart }) {
  const { image, id, current_price, market_cap, ath } = chart.coin;
  const [type, setType] = useState("prices");

  const typeHandler = (e) => {
    const targetButton = e.target.innerText.toLowerCase().split(" ").join("_");
    if (e.target.tagName === "BUTTON") {
      setType(() => targetButton);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        console.log(e.target.classList.value);
        if (e.target.classList.value.includes("container")) {
          setChart(null);
        }
      }}
    >
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={image} />
          <span>{id}</span>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>{current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>{ath}</span>
          </div>

          <div>
            <p>Market Cap:</p>
            <span>$ {market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width="400px" height="400px" data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <XAxis dataKey="date" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
