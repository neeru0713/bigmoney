import React, { useEffect, useState } from "react";
import Table from "./Table";

const HomePage = () => {
  const [trades, setTrades] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
 

  function getTrades() {
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
    <div className="home m-10 flex flex-col gap-2">
    
      <Table
        trades={trades}
        setTrades={setTrades}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
    </div>
  );
};

export default HomePage;
