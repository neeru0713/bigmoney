import { React, useState } from "react";
import Modal from "./Modal";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleNewTradeClick = () => {
    setShowModal(true);
  };

  return (
    <nav className="bg-black w-[100%]">
      <div className="nav-container flex justify-between py-2 mx-10">
        <span id="logo" className="text-white text-2xl">
          BigMoney
        </span>
        <button
          onClick={handleNewTradeClick}
          className="border rounded-md bg-white text-black font-bold px-1"
        >
          New Trade
        </button>

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          height={700}
          width={500}
        />
      </div>
    </nav>
  );
};

export default NavBar;
