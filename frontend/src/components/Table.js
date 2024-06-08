import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";
import Filters from "./Filters";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Assuming you are using react-icons for the icons
import Accordion from "./Accordion"; // Ensure this is the correct path to AccordionContent component

const Table = ({ trades, width, showFilters, setShowFilters, setTrades }) => {
  const [marketIndex, setMarketIndex] = useState("A");
  const [lotSize, setLotSize] = useState();
  const [pnl, setPnl] = useState();
  const [pnlType, setPnlType] = useState("");
  const [pnlColor, setPnlColor] = useState();
  const [returns, setReturns] = useState();
  const [openRows, setOpenRows] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [filterButtonName, setFilterButtonName] = useState("Show");
  // const [applyButtonVisabilty, setApplyButtonVisabilty] = useState(false);

  // const toggleRow = (index) => {
  //   setOpenRows((prevOpenRows) =>
  //     prevOpenRows.includes(index)
  //       ? prevOpenRows.filter((i) => i !== index)
  //       : [...prevOpenRows, index]
  //   );
  // };

  // const accordionHandler = (index) => {
  //   toggleRow(index);
  // };

  const filterButtonClickHandler = () => {
    setShowFilters(!showFilters);
    setFilterButtonName(showFilters ? "Show" : "Hide");
  };

  const applyFilterHandler = () => {
    const temp = trades.filter((item, index) => {
      // check all the states of filter
      // if any state is empty , leave it
      // oterwise compare all states with this item obj
      let flag1 = true;
      let flag2 = true;
      let flag3 = true;
      let flag4 = true;
      if (marketIndex && marketIndex !== "") {
        flag1 = marketIndex === item.marketIndex;
      }
      if (lotSize && lotSize !== "") {
        flag2 = lotSize === item.lotSize;
      }
      if (pnlType && pnlType !== "") {
        flag3 = pnlType === item.pnlType[0];
      }
      if (returns && returns !== "") {
        flag4 = returns === item.returns;
      }

      return flag1 && flag2 && flag3 && flag4;
    });
    setFilteredTrades(temp);
    // setApplyButtonVisabilty(true)
  };

  const clearFilterHundler = () => {
    setMarketIndex("");
    setLotSize("");
    setPnlType("");
    setReturns("");
    setTrades([...trades]);
  };

  const marketIndexMap = {
    N: "Nifty 50",
    NB: "Nifty Bank",
    FN: "Fin Nifty",
    MN: "Midcap Nifty",
    S: "Sensex",
  };

  const indexOptions = [
    { value: "N", label: "Nifty 50" },
    { value: "NB", label: "Nifty Bank" },
    { value: "FN", label: "Fin Nifty" },
    { value: "MN", label: "Midcap Nifty" },
    { value: "S", label: "Sensex" },
  ];

  useEffect(() => {
    setFilteredTrades([...trades]);
  }, [trades]);

  // useEffect(() => {
  //   if (marketIndex === "A") {
  //     setFilteredTrades([...trades]);
  //   } else if (marketIndex !== "") {
  //     const temp = trades?.filter((trade) => trade.marketIndex === marketIndex);
  //     setFilteredTrades(temp);
  //   }
  // }, [marketIndex]);

  // useEffect(() => {
  //   if (isNaN(lotSize)) {
  //     setFilteredTrades([...trades]);
  //   } else {
  //     const temp = trades?.filter((trade) => {
  //       return trade.lotSize === lotSize;
  //     });
  //     setFilteredTrades(temp);
  //   }
  // }, [lotSize]);

  // useEffect(() => {
  //   if (pnlType === "A") {
  //     setFilteredTrades([...filteredTrades]);
  //   } else {
  //     const temp = filteredTrades?.filter((filteredTrades) => {
  //       return filteredTrades.pnlType[0] === pnlType;
  //     });
  //     setFilteredTrades(temp);
  //   }
  // }, [pnlType]);

  const pnlOptions = [
    {
      value: "P",
      label: "Profit",
    },
    {
      value: "L",
      label: "Loss",
    },
  ];

  return (
    <div className="table-component flex flex-col">
      <div className="flex gap-2 items-center">
        <button
          onClick={filterButtonClickHandler}
          className="p-2 border border-2 rounded-lg text-[14px] bg-accent-400 text-white  hover:bg-accent-300"
        >
          {filterButtonName} Filters
        </button>
        <button
          onClick={applyFilterHandler}
          className="p-2 border border-2 rounded-lg text-[14px] bg-accent-400 text-white hover:bg-accent-300 text-center"
        >
          Apply Filter
        </button> 
       

        <button
          onClick={clearFilterHundler}
          className="p-2 border border-2 rounded-lg text-[14px] bg-accent-400 text-white hover:bg-accent-300 text-center"
        >
          Clear Filter
        </button>

        {/* <div className="bg-accent-900 rounded-lg p-2"> filtername : filter value</div> */}
      </div>

      <table className="bg-white w-full overflow-hidden border border-4 rounded-lg">
        <thead className="bg-pink-50">
          <tr className="flex justify-between">
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col items-center">
              <h1>Index</h1>
              {showFilters === true && (
                <Selector
                  name="market-index"
                  options={indexOptions}
                  value={marketIndex}
                  updateValue={setMarketIndex}
                  width="100"
                />
              )}
            </th>
            <th className="py-2 px-4 border-b border-gray-300">Date</th>
            <th className="py-2 px-4 border-b border-gray-300">Time</th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col items-center">
              <h1>Lot Size</h1>
              {showFilters === true && (
                <TextField
                  type="number"
                  placeholder={lotSize}
                  name="Lot Size"
                  value={lotSize}
                  updateValue={setLotSize}
                  width="100"
                />
              )}
            </th>
            <th className="py-2 px-4 border-b border-gray-300">Entry Price</th>
            <th className="py-2 px-4 border-b border-gray-300">Exit Price</th>
            <th className="py-2 px-4 border-b border-gray-300">P&L</th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col items-center">
              <h1>Returns</h1>
              {showFilters === true && (
                <TextField
                  type="number"
                  placeholder="returns"
                  name="returns"
                  value={returns}
                  updateValue={setReturns}
                  width="100"
                />
              )}
            </th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col items-center">
              P&L Type
              {showFilters === true && (
                <Selector
                  name="pnlType"
                  options={pnlOptions}
                  value={pnlType}
                  width="100"
                  updateValue={setPnlType}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody className="border">
          {filteredTrades?.map((item, index) => (
            <tr
              key={index}
              className={`flex justify-between cursor-pointer text-center ml-2 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
              // onClick={() => accordionHandler(index)}
            >
              <td className="py-2 px-4 border-b border-gray-300">
                {marketIndexMap[item?.marketIndex]}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {item.date}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {item.time}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {item.lotSize}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {item.entryPrice}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {item.exitPrice}
              </td>
              <td
                className={`py-2 px-4 border-b border-gray-300 ${
                  item.pnl > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.pnl}
              </td>
              <td
                className={`py-2 px-4 border-b border-gray-300 font-bold ${
                  item.returns > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.returns}%
              </td>
              <td
                className={`py-2 px-4 border-b border-gray-300 ${
                  item.pnlType === "Profit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.pnlType}
              </td>
            </tr>
            /* {openRows.includes(index) && (
                <tr key={`accordion-${index}`}>
                  <td colSpan="10">
                    <Accordion
                      content={`Additional details for trade ${index + 1}`}
                    />
                  </td>
                </tr>
              )} */
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
