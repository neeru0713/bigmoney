import { React, useState } from "react";
import Modal from "./Modal";
import Drawer from "./Drawer";


const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


  const handleNewTradeClick = () => {
    setShowModal(true);

  };

  const handleMenuClick = () => {
    setIsDrawerOpen(true)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (
    <nav className="bg-black w-[100%]">
      <div className="nav-container flex justify-between py-2 mx-10">
        <span id="logo" className="text-white text-2xl">
          BigMoney
        </span>
        <div className="flex gap-2">
        
        <button
          onClick={handleNewTradeClick}
          className="border rounded-md hover:bg-white hover:text-black font-bold px-2 bg-black text-white"
        >
          New Trade
        </button>
        <button
          onClick={handleMenuClick}
          className="border rounded-md hover:bg-white hover:text-black font-bold px-2 bg-black text-white"
        >
          Menu
        </button>
        </div>
        {/* <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <h2>Drawer Content</h2>
        <p>This is the content of the drawer.</p>
      </Drawer> */}

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
