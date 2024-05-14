import { React, useEffect, useState } from "react";
import Selector from "./Selector";

const Modal = ({ showModal, setShowModal, width, height }) => {
  const styles = {
    height: `${height}px`,
    width: `${width}px`,
  };

  const [marketIndex, setMarketIndex] = useState("N");
  const [pnl, setPnl] = useState("P");
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

  return (
    <>
      {showModal && (
        <div
          className="rounded-lg flex flex-col fixed p-2 border border-gray-300 top-10 left-[35%] border border-2"
          style={styles}
        >
          <Selector
            name="market-index"
            options={indexOptions}
            value={marketIndex}
            updateValue={setMarketIndex}
          />
          <div className="flex items-center gap-4">
            <Selector
              name="pnl"
              options={pnlOptions}
              value={pnl}
              updateValue={setPnl}
            />

            {pnl === "P" ? (
              <div className="bg-[#0a9981] rounded h-8 w-8"></div>
            ) : (
              <div className="bg-[#f23545] rounded h-8 w-8"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
