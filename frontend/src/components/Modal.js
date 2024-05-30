import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Notification from "./Notification";

const Modal = ({ showModal, setShowModal, width, height }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const checklistItems = [
    "In the trend",
    "9ema + 15ema",
    "Hammer candle",
    "Big bar candle",
    "Big bar with equal wicks",
    "Waited for pullback",
    "Direct Entry",
    "1:1",
    "1:2",
    "1:3",
  ];

  const [checkList, setCheckList] = useState(
    checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [entryPrice, setEntryPrice] = useState();
  const [exitPrice, setExitPrice] = useState();
  const [mistakeTypeValues, SetMistakeTypeValues] = useState("");
  const [marketIndex, setMarketIndex] = useState("N");
  const [pnl, setPnl] = useState();
  const [pnlColor, setPnlColor] = useState();
  const [lotSize, setLotSize] = useState(1);
  const [returns, setReturns] = useState();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(getCurrentTime());
  const [notificationType, setNotificationType] = useState("success");
  const [message, setMessage] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleCheckboxChange = (item) => {
    setCheckList((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const nextClickHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousClickHandler = () => {
    setPageNumber(pageNumber - 1);
  };

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

  let styles = {
    height: `${height}px`,
    width: `${width}px`,

  };

  const lotSizeMap = {
    S: 10,
    N: 25,
    NB: 15,
    FN: 40,
    MN: 75,
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
    let checkedItems = [];
    checklistItems.forEach((item) => {
      if (checkList[item]) {
        checkedItems.push(item);
      }
    });

    let pnlType = "Profit";
    if (pnl > 0) {
      pnlType = "Profit";
    } else {
      pnlType = "Loss";
    }

    const postData = {
      entryPrice,
      exitPrice,
      marketIndex,
      pnl,
      pnlType,
      mistakeTypeValues,
      lotSize,
      returns,
      date,
      time,
      checkedItems,
    };

    fetch("http://localhost:8080/api/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        console.log(response.status, response);
        if (response.status !== 201) {
          setNotificationType("error");
        } else {
          setNotificationType("success");
        }
        setIsShow(true);
        setShowModal(false);
        return response.json();
      })
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div
            className={`modal-content relative rounded-lg flex flex-col fixed p-2 border border-gray-300 top-[8%] left-[35%] bg-white justify-between my-2 ${getShadow()}`}
            style={styles}
          >
            <div
              id="arrow-btns"
              className="absolute flex gap-4 text-xl cursor-pointer right-4 top-4"
            >
              <FaArrowLeft onClick={previousClickHandler} />
              <FaArrowRight onClick={nextClickHandler} />
            </div>

            {pageNumber === 1 && (
              <div id="basic-form">
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
                <TextField
                  type="number"
                  placeholder="returns"
                  name="returns"
                  value={returns}
                  updateValue={setReturns}
                />
                {pnl < 0 ? (
                  <Selector
                    name="mistakeTypeValues"
                    options={mistakeTypeValuesOptions}
                    value={mistakeTypeValues}
                    updateValue={SetMistakeTypeValues}
                  />
                ) : null}
              </div>
            )}

            {pageNumber === 2 && (
              <div id="setUp-checklist">
                <h2 className="p-2 text-2xl font-bold">Checklist</h2>
                {checklistItems.map((item, index) => (
                  <div className="flex items-center mt-4 gap-2" key={index}>
                    <TextField
                      type="checkbox"
                      checked={checkList[item]}
                      name={item}
                      updateValue={handleCheckboxChange}
                    >
                      <h1 className="text-lg font-semibold ml-2">{item}</h1>
                    </TextField>
                  </div>
                ))}
              </div>
            )}

            {pageNumber === 3 && <div></div>}

            <div className="cancel-save flex gap-5 m-2 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="border border-red-600 rounded-md bg-white font-bold text-red-500 p-2 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              {pageNumber === 2 && (
                <button
                  onClick={saveHandler}
                  className="border border-[#0a9981] font-bold rounded-md bg-white text-[#0a9981] px-2 hover:bg-[#0a9981] hover:text-white"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Notification
        notificationType={notificationType}
        message={message}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </>
  );
};

export default Modal;
