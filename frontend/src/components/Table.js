import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";
import Filters from "./Filters";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Assuming you are using react-icons for the icons
import Accordion from "./Accordion"; // Ensure this is the correct path to AccordionContent component
import { Fa3 } from "react-icons/fa6";
import PopOver from "./PopOver";

const Table = ({ trades, width, showFilters, setShowFilters, setTrades }) => {
  const [marketIndex, setMarketIndex] = useState("N");
  const [lotSize, setLotSize] = useState();
  const [pnl, setPnl] = useState();
  const [pnlType, setPnlType] = useState("");
  const [pnlColor, setPnlColor] = useState();
  const [returns, setReturns] = useState();
  const [openRows, setOpenRows] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [filterButtonName, setFilterButtonName] = useState("Show");
  const [riskReward, setRiskReward] = useState();
  const [isShowPopOver, setIsShowPopOver] = useState(false);

  const checklistItems = [
    "In the trend",
    "9ema + 15ema",
    "Hammer candle",
    "Big bar candle",
    "Big bar with equal wicks",
    "Waited for pullback",
    "Direct Entry",
  ];

  const [selectedSetUpCondtions, setSelectedSetUpCondtions] = useState(
    checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );

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
    setIsShowPopOver(false);
    const temp = trades.filter((item, index) => {
      // check all the states of filter
      // if any state is empty , leave it
      // oterwise compare all states with this item obj
      let flag1 = true;
      let flag2 = true;
      let flag3 = true;
      let flag4 = true;
      let flag5 = true;
      let flag6 = true;
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
      if (riskReward && riskReward !== "") {
        flag5 = riskReward === item.riskRewardRatio;
      }
      if (selectedSetUpCondtions && selectedSetUpCondtions !== "") {
        let checkedItems = [];
        checklistItems.forEach((item1) => {
          if (selectedSetUpCondtions[item1]) {
            checkedItems.push(item1);
          }
        });

        flag6 = checkedItems.every((item2) =>
          item.setupCheckList.includes(item2)
        );
      }

      return flag1 && flag2 && flag3 && flag4 && flag5 && flag6;
    });
    setFilteredTrades(temp);
    // setApplyButtonVisabilty(true)
  };

  const clearFilterHundler = () => {
    setMarketIndex("");
    setLotSize("");
    setPnlType("");
    setReturns("");
    setRiskReward();

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

  const riskRewardOptions = [
    {
      value: 1,
      label: "1: 1",
    },
    {
      value: 2,
      label: "1: 2",
    },
    {
      value: 3,
      label: "1: 3",
    },
    {
      value: 4,
      label: "1: 4",
    },
    {
      value: 5,
      label: "1: 5",
    },
    {
      value: 6,
      label: "1: 6",
    },
    {
      value: 7,
      label: "1: 7",
    },
    {
      value: 8,
      label: "1: 8",
    },
    {
      value: 9,
      label: "1: 9",
    },
    {
      value: 10,
      label: "1: 10",
    },
    {
      value: 11,
      label: "1: 10+",
    },
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

  const selectOptionsHandler = () => {
    setIsShowPopOver(!isShowPopOver);
  };

  return (
    <div className="table-component flex flex-col">
      <div className="flex gap-2 items-center mb-4">
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
        <thead className="bg-gray-100">
          <tr className="flex justify-between border-b border-gray-300">
            <th className="py-2 px-4 flex flex-col items-center">
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
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Time</th>
            <th className="py-2 px-4 flex flex-col items-center">
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
            <th className="py-2 px-4">Entry Price</th>
            <th className="py-2 px-4">Exit Price</th>
            <th className="py-2 px-4">P&L</th>
            <th className="py-2 px-4 flex flex-col items-center">
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
            <th className="py-2 px-4 flex flex-col items-center">
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
            <th className="py-2 px-4">
              Risk/Reward
              {showFilters === true && (
                <Selector
                  name="riskReward"
                  options={riskRewardOptions}
                  value={riskReward}
                  width="100"
                  updateValue={setRiskReward}
                />
              )}
            </th>
            <th className="py-2 px-4 flex flex-col">
              <span>Setup Condtions</span>
              {showFilters === true && (
                <button
                  onClick={selectOptionsHandler}
                  className="text-sm underline decoration-sky-600 text-blue-600"
                >
                  Select
                </button>
              )}
            </th>
            <PopOver
              isShowPopOver={isShowPopOver}
              setIsShowPopOver={setIsShowPopOver}
              selectedSetUpCondtions={selectedSetUpCondtions}
              setSelectedSetUpCondtions={setSelectedSetUpCondtions}
            />
          </tr>
        </thead>
        <tbody className="border">
          {filteredTrades?.map((item, index) => (
            <tr
              key={index}
              className={`flex justify-between cursor-pointer text-center ml-2 border-b border-gray-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
              // onClick={() => accordionHandler(index)}
            >
              <td className="py-2 px-4">{marketIndexMap[item?.marketIndex]}</td>
              <td className="py-2 px-4">{item.date}</td>
              <td className="py-2 px-4">{item.time}</td>
              <td className="py-2 px-4">{item.lotSize}</td>
              <td className="py-2 px-4">{item.entryPrice}</td>
              <td className="py-2 px-4">{item.exitPrice}</td>
              <td
                className={`py-2 px-4 ${
                  item.pnl > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.pnl}
              </td>
              <td
                className={`py-2 px-4 font-bold ${
                  item.returns > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.returns}%
              </td>
              <td
                className={`py-2 px-4 ${
                  item.pnlType === "Profit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.pnlType}
              </td>
              <td className="py-2 px-4">{item.riskRewardRatio}</td>

              <td
                key={index}
                className="flex gap-1 m-1 flex-wrap justify-center items-center"
              >
                {item.setupCheckList?.map((setUpCondtion, index) => (
                  <span className="rounded-lg bg-blue-50 border border-blue-600 text-xs text-black p-1">
                    {setUpCondtion}
                  </span>
                ))}
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
