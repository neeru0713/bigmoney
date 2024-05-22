import React, { useEffect, useState } from "react";
import Table from "./Table";

const HomePage = () => {
  const [trades, setTrades] = useState([]);

  function getTrades(){
    fetch("http://localhost:8080/api/trade", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        return response.json();
      })
      .then((data) => {
        setTrades(data.trades);
      })
      .catch((error) => {
        console.error("Error fetching trades:", error);
      });
  }

  useEffect(() => {
    getTrades();
  }, []);

  return (
    <div className="home">
      <h1 className="p-2 text-3xl font-bold text-center m-[3%]">Trade List</h1>
     <Table trades={trades}/>
    </div>
  );
};

export default HomePage;
