import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "../style/navbar.css";
import { IoCloudUploadSharp } from "react-icons/io5";
import aptosLogo from "../images/Aptos_logo.png";
import { MdCreateNewFolder } from "react-icons/md";
import Popupplaylist from "../pages/Popupplaylist";
import Newplaylist from "../pages/Newplaylist";

type Props = {
  sidenav: Boolean;
  text: string;
  handleclose: () => void;
};
const SideNavbar: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="side-navbar">
      <div className="logo-items">
        <img src={aptosLogo} alt="aptos-logo" className="app-logo" />
        <p>Aptos</p>
      </div>
      <p className="menu-head">Menu</p>
      <div className="menu-tab">
        <div className="menu-item">
          <FaHome className="menu-icon" />
          <Link to="/">Home</Link>
          <br />
          <br />
        </div>
        <div className="menu-item">
          <CgProfile className="menu-icon" />
          <Link to="/profile">Profile</Link>
          <br />
          <br />
        </div>
        <div className="menu-item">
          <IoCloudUploadSharp className="menu-icon" />
          <Link to="/upload">Upload</Link>
          <br />
          <br />
        </div>
      </div>

      <br />

      <p className="menu-head">Your Library</p>
      <div className="menu-tab">
        <div className="menu-item">
          <MdCreateNewFolder className="menu-icon" />
          <div onClick={handleOpen} >Create Playlist</div>
        </div>
        <div>
          {open ? (
            <Popupplaylist
              isOpen={open}
              onClose={handleClose}
              onOpen={handleOpen}
            />
          ) : null}
        </div>

        <div className="menu-item-list">
          <Newplaylist />
        </div>

        <div className="menu-item">
          <IoCloudUploadSharp className="menu-icon" />
          <Link to="/govern">Govern</Link>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
