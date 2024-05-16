import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";

const Modal = ({ showModal, setShowModal, width, height }) => {
  const [entryPrice, setEntryPrice] = useState();
  const [exitPrice, setExitPrice] = useState();
  const [mistakeTypeValues, SetMistakeTypeValues] = useState("BP");
  const [marketIndex, setMarketIndex] = useState("N");
  const [pnl, setPnl] = useState();
  const [pnlColor, setPnlColor] = useState();

  useEffect(() => {
    // calculate P&l amount and returns
    const pnl = exitPrice - entryPrice;
    const colorval = pnl > 0 ? 'green' : 'red'
    console.log("colorval : ", colorval)
    setPnlColor(colorval);
    setPnl(pnl);
  }, [entryPrice, exitPrice]);

  const styles = {
    height: `${height}px`,
    width: `${width}px`,
  };

  const indexOptions = [
    {
      value: "N",
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

  const mistakeTypeValuesOptions = [
    {
      value: "BP",
      label: "Bad Psychology",
    },
    {
      value: "F",
      label: "FOMO",
    },
    {
      value: "RCE",
      label: "Running Candle Entry",
    },
    {
      value: "V",
      label: "Volatility",
    },
    {
      value: "UM",
      label: "Unpredictable Market",
    },
    {
      value: "S",
      label: "Sideways",
    },
    {
      value: "G",
      label: "Greed",
    },
    {
      value: "OE",
      label: "Over Expectation",
    },
    {
      value: "LC",
      label: "Low Confidence",
    },
  ];

  const getShadow = () => {
    let shadowClass;
    if(!pnl){
        shadowClass = 'gray-shadow'
    } else if(pnl && pnl > 0){
        shadowClass = 'green-shadow'
    } else if(pnl && pnl < 0){
        shadowClass = 'red-shadow'
    }
    return shadowClass;
  }

  return (
    showModal && (
      <div className="modal-overlay">
        <div
          className={`modal-content rounded-lg flex flex-col fixed p-2 border border-gray-300 top-[8%] left-[35%] bg-white ${getShadow()}`}
          style={styles}
        >
          <Selector
            name="market-index"
            options={indexOptions}
            value={marketIndex}
            updateValue={setMarketIndex}
          />
          <TextField
            type="number"
            placeholder="Entry Price"
            name="Entry Price"
            value={entryPrice}
            updateValue={setEntryPrice}
          />
          <TextField
            type="number"
            placeholder="Exit Price"
            name="Exit Price"
            value={exitPrice}
            updateValue={setExitPrice}
          />
          <div className="flex items-center gap-4">
            <TextField
              type="number"
              placeholder="P&L"
              name="pnl"
              value={pnl}
              color={pnlColor}
              updateValue={setPnl}
            />

            { (pnl>0) ? (
              <div className="bg-[#0a9981] rounded h-8 w-8"></div>
            ) : (
              <div className="bg-[#f23545] rounded h-8 w-8"></div>
            )}
          </div>

          <Selector
            name="mistakeTypeValues"
            options={mistakeTypeValuesOptions}
            value={mistakeTypeValues}
            updateValue={SetMistakeTypeValues}
          />

          <div className="flex gap-2 m-2">
            <button onClick={() =>{setShowModal(false)}} className="border border-red-600 rounded-md bg-white font-bold text-red-500 p-2 hover:bg-red-500 hover:text-white">
              Cancel
            </button>

            <button className="border border-[#0a9981] font-bold rounded-md bg-white text-[#0a9981] px-2 hover:bg-[#0a9981] hover:text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
