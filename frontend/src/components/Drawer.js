import React from "react";
import "./Drawer.css";

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${isOpen ? "modal-overlay" : ""}`} onClick={onClose}>
      <div className={`drawer ${isOpen ? "open " : ""}`} >
        <div className="drawer-content">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
