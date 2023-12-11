import React from "react";
import { IoMdClose } from "react-icons/io";
import "../style/popupplaylist.css";

type prop = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const tipPopup: React.FC<prop> = ({ isOpen, onClose, onOpen }) => {
  return (
    <div className="popup">
      <div className="popup-inside">
        <IoMdClose onClick={onClose} className="closepopup"/>
        <form action="/">
        <input type="text" required placeholder="New playlist name"/><br />
        <button type="submit">done</button>
        </form>
      </div>
    </div>
  );
};

export default tipPopup;
