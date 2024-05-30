import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";
import Filters from "./Filters";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Assuming you are using react-icons for the icons
import Accordion from "./Accordion"; // Ensure this is the correct path to AccordionContent component

const Table = ({ trades, width }) => {
  const [marketIndex, setMarketIndex] = useState("A");
  const [lotSize, setLotSize] = useState();
  const [pnl, setPnl] = useState();
  const [pnlType, setPnlType] = useState("");
  const [pnlColor, setPnlColor] = useState();
  const [returns, setReturns] = useState();
  const [openRows, setOpenRows] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);

  const toggleRow = (index) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(index)
        ? prevOpenRows.filter((i) => i !== index)
        : [...prevOpenRows, index]
    );
  };

  const accordionHandler = (index) => {
    toggleRow(index);
  };

  const marketIndexMap = {
    N: "Nifty 50",
    NB: "Nifty Bank",
    FN: "Fin Nifty",
    MN: "Midcap Nifty",
    S: "Sensex",
  };

  const indexOptions = [
    { value: "A", label: "Show All" },
    { value: "N", label: "Nifty 50" },
    { value: "NB", label: "Nifty Bank" },
    { value: "FN", label: "Fin Nifty" },
    { value: "MN", label: "Midcap Nifty" },
    { value: "S", label: "Sensex" },
  ];

  useEffect(() => {
    setFilteredTrades([...trades]);
  }, [trades]);

  useEffect(() => {
    if (marketIndex === "A") {
      setFilteredTrades([...trades]);
    } else if (marketIndex !== "") {
      const temp = trades?.filter((trade) => trade.marketIndex === marketIndex);
      setFilteredTrades(temp);
    }
  }, [marketIndex]);

  useEffect(() => {
    if (isNaN(lotSize)) {
      setFilteredTrades([...trades]);
    } else {
      const temp = trades?.filter((trade) => {
        return trade.lotSize === lotSize;
      });
      setFilteredTrades(temp);
    }
  }, [lotSize]);

  useEffect(() => {
    if (pnlType === "A") {
      setFilteredTrades([...trades]);
    } else {
      const temp = trades?.filter((trade) => {
        return trade.pnlType[0] === pnlType;
      });
      setFilteredTrades(temp);
    }
  }, [pnlType]);

  const pnlOptions = [
    {
      value: "A",
      label: "Show All",
    },
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
    <div>
      <table className="m-auto bg-white border border-gray-400">
        <thead>
          <tr className="flex justify-between">
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col">
              <h1>Index</h1>
              <Selector
                name="market-index"
                options={indexOptions}
                value={marketIndex}
                updateValue={setMarketIndex}
                width="100"
              />
            </th>
            <th className="py-2 px-4 border-b border-gray-300">Date</th>
            <th className="py-2 px-4 border-b border-gray-300">Time</th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col">
              <h1>Lot Size</h1>
              <TextField
                type="number"
                placeholder={lotSize}
                name="Lot Size"
                value={lotSize}
                updateValue={setLotSize}
                width="100"
              />
            </th>
            <th className="py-2 px-4 border-b border-gray-300">Entry Price</th>
            <th className="py-2 px-4 border-b border-gray-300">Exit Price</th>
            <th className="py-2 px-4 border-b border-gray-300">P&L</th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col">
              <h1>Returns</h1>
              <TextField
                type="number"
                placeholder="returns"
                name="returns"
                value={returns}
                updateValue={setReturns}
                width="100"
              />
            </th>
            <th className="py-2 px-4 border-b border-gray-300 flex flex-col">
              P&L Type
              <Selector
                name="pnlType"
                options={pnlOptions}
                value={pnlType}
                width="100"
                updateValue={setPnlType}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades?.map((item, index) => (
            <>
              <tr
                key={index}
                className="flex justify-between cursor-pointer items-center ml-2"
                onClick={() => accordionHandler(index)}
              >
                <td className="py-2 px-4 border-b border-gray-300">
                  {openRows.includes(index) ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </td>
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
                    item.pnlType === "Profit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.pnlType}
                </td>
              </tr>
              {/* {openRows.includes(index) && (
                <tr key={`accordion-${index}`}>
                  <td colSpan="10">
                    <Accordion
                      content={`Additional details for trade ${index + 1}`}
                    />
                  </td>
                </tr>
              )} */}
            </>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col">
      <Filters filteredTrades={filteredTrades} setFilteredTrades={setFilteredTrades} trades={trades}/>
      <div className="absolute bottom-[46%] border border-gray-400 p-2 left-[5%]">Applied Filter</div>
    </div>
    </div>
  );
};

export default Table;
