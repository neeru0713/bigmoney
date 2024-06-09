import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import TextField from "./TextField";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Notification from "./Notification";
import { RiStockLine } from "react-icons/ri";
import { API_URL } from "../config.js";

const Modal = ({ showModal, setShowModal, width, height, checkBoxWeight, checkBoxHeight}) => {
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
  ];

  const [checkList, setCheckList] = useState(
    checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );
  const [activeTab, setActiveTab] = useState("basicInfo");
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
  const [riskRewardRatio, setRiskRewardRatio] = useState(2);
  const [backTest, setBackTest] = useState(false);
  const [setUpCondtions, setSetUpCondtions] = useState()
 

  const handleBackTestCheckBoxChange = (item) => {
    alert("handleBackTestCheckBoxChange");
    setBackTest(!backTest);
  };

  const handleCheckboxChange = (item) => {
    setCheckList((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
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

  const riskRewardRatioOptions = [
    {
      value: "1",
      label: "1: 1",
    },
    {
      value: "2",
      label: "1: 2",
    },
    {
      value: "3",
      label: "1: 3",
    },
    {
      value: "4",
      label: "1: 4",
    },
    {
      value: "5",
      label: "1: 5",
    },
    {
      value: "6",
      label: "1: 6",
    },
    {
      value: "7",
      label: "1: 7",
    },
    {
      value: "8",
      label: "1: 8",
    },
    {
      value: "9",
      label: "1: 9",
    },
    {
      value: "10",
      label: "1: 10",
    },
    {
      value: "11",
      label: "1: 10+",
    },
  ];

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
      riskRewardRatio,
      backTest,
      setUpCondtions,

    };

    const url = `${API_URL}/api/trade`;
    fetch(url, {
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
            className={`modal-content relative rounded-lg flex flex-col fixed p-2 border border-gray-300 top-[8%] left-[35%] bg-white  border-b border-gray-300 ${getShadow()}`}
            style={styles}
          >
            {/* <div
              id="arrow-btns"
              className="absolute flex gap-4 text-xl cursor-pointer right-4 top-4"
            >
              <FaArrowLeft onClick={previousClickHandler} />
              <FaArrowRight onClick={nextClickHandler} />
            </div> */}
            <div className="flex flex-col m-2">
              <RiStockLine className="text-5xl  border rounded-md p-2 text-accent-400 border-primary" />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-gradient mt-3">
                  Create new trade
                </h1>
                <div className="flex flex-col">
                  <div class="tabs flex">
                    <h2
                      onClick={() => setActiveTab("basicInfo")}
                      className={`p-2 cursor-pointer text-md font-bold ${
                        activeTab === "basicInfo"
                          ? "border-b-4 border-secondary"
                          : ""
                      } `}
                    >
                      Basic Info
                    </h2>
                    <h2
                      onClick={() => setActiveTab("checklist")}
                      className={`p-2 cursor-pointer text-md font-bold ${
                        activeTab === "checklist"
                          ? "border-b-4 border-secondary"
                          : ""
                      } `}
                    >
                      Checklist
                    </h2>
                  </div>
                  <hr className="border-gray-200" />
                </div>
              </div>
            </div>

            {activeTab === "basicInfo" && (
              <div id="basic-form">
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
                <div className="flex gap-[14%]">
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
                </div>
                <div className="flex gap-5">
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
                </div>
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
                <Selector
                  name="Risk/Reward Ratio"
                  options={riskRewardRatioOptions}
                  value={riskRewardRatio}
                  updateValue={setRiskRewardRatio}
                />
                <TextField
                  type="checkbox"
                  checked={backTest}
                  name="Back Test"
                  updateValue={handleBackTestCheckBoxChange}
                >
                  <h1 className="font-semibold">BackTest</h1>
                </TextField>
              </div>
            )}

            {activeTab === "checklist" && (
              <div id="setUp-checklist">
                {checklistItems.map((item, index) => (
                  <div className="flex items-center mt-4 gap-2" key={index}>
                    <TextField
                      type="checkbox"
                      checked={checkList[item]}
                      name={item}
                      updateValue={handleCheckboxChange}
                      checkBoxHeight="1.5"
                      checkBoxWeight="1.5"
                    >
                      <h1 className="text-lg font-semibold ml-2">{item}</h1>
                    </TextField>
                  </div>
                ))}
              </div>
            )}

            <div className="cancel-save flex gap-5 m-2 justify-end ">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="rounded-md bg-accent-950 font-bold p-2 "
              >
                Cancel
              </button>

              <button
                onClick={saveHandler}
                className="font-bold rounded-md bg-accent-400 text-white px-2"
              >
                Save
              </button>
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
