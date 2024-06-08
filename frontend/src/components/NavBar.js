import { React, useState } from "react";
import Modal from "./Modal";
import Drawer from "./Drawer";
import logo from "./bull-outline.png"

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
    <nav className="bg-primary w-[100%]">
      <div className="nav-container flex justify-between items-center py-2 mx-10">
        <div className="flex gap-3 items-center">
        <img src={logo}  className="h-10 w-10 text-white"/>
        <span id="logo" className="text-white text-xl">
          BigMoney
        </span>
        </div>
      
        <div className="flex gap-2">
        
        <div
          onClick={handleNewTradeClick}
          className="text-white px-2 cursor-pointer"
        >
          New Trade
        </div>
        <div
          onClick={handleMenuClick}
          className="text-white px-2 cursor-pointer"
        >
          Menu
        </div>
        </div>
        {/* <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <h2>Drawer Content</h2>
        <p>This is the content of the drawer.</p>
      </Drawer> */}

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          height={725}
          width={500}
        />
       
      </div>
    </nav>
  );
};

export default NavBar;
