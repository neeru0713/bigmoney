import { React, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";

const Table = ({ trades, width }) => {
  const [marketIndex, setMarketIndex] = useState("");
  const [lotSize, setLotSize] = useState(1);
  const [pnl, setPnl] = useState();
  const [pnlColor, setPnlColor] = useState();
  const [returns, setReturns] = useState();

  const marketIndexMap = {
    N: "Nifty 50",
    NB: "Nifty Bank",
    FN: "Fin Nifty",
    MN: "Midcap Nifty",
    S: "Sensex",
  };

  const indexOptions = [
    {
      value: "Nifty",
      label: "Nifty 50",
    },
    {
      value: "NB",
      label: "Nifty Bank",
    },
    {
      value: "FN",
      label: "Fin Nifty",
    },
    {
      value: "MN",
      label: "Midcap Nifty",
    },
    {
      value: "S",
      label: "Sensex",
    },
  ];
  return (
    <div>
      <table className="m-auto bg-white border border-gray-300">
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
              <TextField
                type="string"
                placeholder="P&L"
                name="pnl"
                value={pnl}
                color={pnlColor}
                width="100"
                updateValue={setPnl}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {trades?.map((item, index) => (
            <tr key={index} className="flex justify-between">
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
              <td className={`py-2 px-4 border-b border-gray-300 font-bold ${
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
