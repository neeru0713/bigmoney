import React from "react";
import { RxCross2 } from "react-icons/rx";

const Notification = ({ notificationType, message, isShow, setIsShow }) => {
  return (
    isShow && (
      <div
        className={`border  ${
          notificationType === "success"
            ? "border-green-400 bg-green-100"
            : "border-red-400 bg-red-100"
        }  text-green-900 font-bold rounded-md p-2 text-lg absolute bottom-0 left-[42%] mb-[5%] flex items-center gap-5`}
      >
        <p> {message}</p>

        <RxCross2
          onClick={() => {
            setIsShow(false);
          }}
          className="text-lg font-bold "
        />
      </div>
    )
  );
};

export default Notification;
