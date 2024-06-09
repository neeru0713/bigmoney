import { React, useState } from "react";
import TextField from "./TextField";

const PopOver = ({
  isShowPopOver,
  setIsShowPopOver,
  checkBoxWeight,
  checkBoxHeight,
  setSelectedSetUpCondtions,
  selectedSetUpCondtions,
}) => {
  const checklistItems = [
    "In the trend",
    "9ema + 15ema",
    "Hammer candle",
    "Big bar candle",
    "Big bar with equal wicks",
    "Waited for pullback",
    "Direct Entry",
  ];

  const handleCheckboxChange = (item) => {
    setSelectedSetUpCondtions((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <>
      {isShowPopOver && (
        <div className="absolute right-20 top-[200px] border rounded-lg  bg-white  w-[180px] overflow-scroll p-4">
          {checklistItems.map((item, index) => (
            <TextField
              type="checkbox"
              checked={selectedSetUpCondtions[item]}
              name={item}
              updateValue={handleCheckboxChange}
              checkBoxWeight="0.8"
              checkBoxHeight="0.8"
            >
              <h1 className="text-sm py-1">{item}</h1>
            </TextField>
          ))}
        </div>
      )}
    </>
  );
};

export default PopOver;
