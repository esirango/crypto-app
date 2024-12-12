import React, { useEffect, useState } from "react";

import { getCoinList } from "../services/cryptoApi";
import TableCoin from "../module/TableCoin";
import Pagination from "../module/Pagination";
import Search from "../module/Search";
import Chart from "../module/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [currentCoin, setCurrentCoin] = useState("");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getData();
  }, [page, currency]);

  return (
    <div>
      <Search
        currency={currency}
        setCurrency={setCurrency}
        currentCoin={currentCoin}
        setCurrentCoin={setCurrentCoin}
      />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
        currentCoin={currentCoin}
      />
      <Pagination page={page} setPage={setPage} coinsLength={coins?.length} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
