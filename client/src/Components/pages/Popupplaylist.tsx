import React from "react";
import { IoMdClose } from "react-icons/io";
import "../style/popupplaylist.css";
type prop = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const Popupplaylist: React.FC<prop> = ({ isOpen, onClose, onOpen }) => {
  return (
    <div className="popup">
      <div>
        <h1>new playlist name</h1>
        <form action="/">
        <input type="text" required placeholder="type new playlist name"/> <br />
        <button type="submit">done</button>
        </form>
        <IoMdClose onClick={onClose} className="closepopup"/>
      </div>
    </div>
  );
};

export default Popupplaylist;
