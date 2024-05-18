import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";

const Modal = ({ showModal, setShowModal, width, height }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [entryPrice, setEntryPrice] = useState();
  const [exitPrice, setExitPrice] = useState();
  const [mistakeTypeValues, SetMistakeTypeValues] = useState("");
  const [marketIndex, setMarketIndex] = useState("N");
  const [pnl, setPnl] = useState();
  const [pnlColor, setPnlColor] = useState();
  const [lotSize, setLotSize] = useState(1);
  const [returns, setReturns] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const pnl = lotSizeMap[marketIndex] * lotSize * (exitPrice - entryPrice);
    let returns = ((exitPrice - entryPrice) / entryPrice) * 100;
    returns = parseFloat(returns.toFixed(2));
    if (isNaN(returns)) {
      setReturns(0);
    } else {
      setReturns(returns);
    }

    const colorval = pnl > 0 ? "green" : "red";
    console.log("colorval : ", colorval);
    setPnl(colorval);
    setPnl(pnl);
  }, [entryPrice, exitPrice, marketIndex, lotSize]);

  const styles = {
    height: `${height}px`,
    width: `${width}px`,
  };

  // lotSizeMap[marketIndex]

  const lotSizeMap = {
    S: 10,
    N: 25,
    NB: 15,
    FN: 40,
    MN: 75,
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
    if (!pnl) {
      shadowClass = "gray-shadow";
    } else if (pnl && pnl > 0) {
      shadowClass = "green-shadow";
    } else if (pnl && pnl < 0) {
      shadowClass = "red-shadow";
    }
    return shadowClass;
  };

  const saveHandler = (e) => {
    e.preventDefault();

    const postData = {
      entryPrice,
      exitPrice,
      marketIndex,
      pnl,
      mistakeTypeValues,
      lotSize,
      returns,
      date,
      time,
    };

    fetch("http://localhost:8080/api/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        // if (!response.ok) {

        //   throw new Error("Email already taken");
        // }

        return response.json();
      })

      .then((data) => {
        // setUser(data.user);
      })
      .catch((error) => {
        // setIsShowNotification(true)
        // setNotificationData({
        //     severity: 'error',
        //     message: error.message,
        // })
        // console.error("Error registering user:", error);
      });
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div
          className={`modal-content rounded-lg flex flex-col fixed p-2 border border-gray-300 top-[8%] left-[35%] bg-white ${getShadow()}`}
          style={styles}
        >
          <h2 className="p-2 text-2xl font-bold">Basic Info</h2>
          <Selector
            name="market-index"
            options={indexOptions}
            value={marketIndex}
            updateValue={setMarketIndex}
          />
          <TextField
            type="number"
            placeholder={lotSize}
            name="Lot Size"
            value={lotSize}
            updateValue={setLotSize}
          />
          <TextField
            type="date"
            id="date"
            name="date"
            value={date}
            updateValue={setDate}
          />
          <TextField
            type="time"
            id="time"
            name="time"
            value={time}
            updateValue={setTime}
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

            {returns === 0 && (
              <div className="bg-gray-100 text-gray-600 font-bold rounded p-1">
                {returns}%
              </div>
            )}

            {returns != 0 && (
              <>
                {pnl > 0 ? (
                  <div className="bg-green-100 text-green-600 font-bold rounded p-1">
                    {returns}%
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-600 font-bold rounded p-1">
                    {returns}%
                  </div>
                )}
              </>
            )}
          </div>
          {pnl < 0 ? (
            <Selector
              name="mistakeTypeValues"
              options={mistakeTypeValuesOptions}
              value={mistakeTypeValues}
              updateValue={SetMistakeTypeValues}
            />
          ) : null}

          <div className="flex gap-2 m-2">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="border border-red-600 rounded-md bg-white font-bold text-red-500 p-2 hover:bg-red-500 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveHandler}
              className="border border-[#0a9981] font-bold rounded-md bg-white text-[#0a9981] px-2 hover:bg-[#0a9981] hover:text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
