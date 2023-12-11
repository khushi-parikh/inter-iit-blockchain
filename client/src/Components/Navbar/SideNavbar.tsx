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
import { VscFeedback } from "react-icons/vsc";
import { Network, Provider } from 'aptos'
import { useWallet } from "@aptos-labs/wallet-adapter-react"

type Props = {
  sidenav: Boolean;
  text: string;
  handleclose: () => void;
};
const provider = new Provider(Network.DEVNET);

const SideNavbar: React.FC<Props> = () => {
  const [accountHasUser, setAccountHasUser] = useState(false);
  
  const [open, setOpen] = React.useState(false);
  const [showupload,setShowUpload] = React.useState(false);
  const { account, signAndSubmitTransaction } = useWallet();
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const handledisplay =() => {
    setShowUpload(true);
    createArtist();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const createArtist = async () => {
    // console.log('account name',account?.address)
    console.log('createArtist function call ho gya')

    if (!account) return [];
    const payload = {
        
        type: "entry_function_payload",
        function: `${module_address}::Profile::create_artist`,
        type_arguments: [],
        arguments: [],
    };
    try {
        // sign and submit transaction to chain
        const response = await signAndSubmitTransaction(payload);
        console.log("response", response)
    // setUserkey(account?.address)
        await provider.waitForTransaction(response.hash);
        setAccountHasUser(true);
        console.log("Completed adding User")
    }
    catch (error: any) {
        setAccountHasUser(false);
    }
}


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
        {showupload ?  <div className="menu-item ">
          <IoCloudUploadSharp className="menu-icon" />
          <Link to="/upload">Upload</Link>
          <br />
          <br />
        </div> : <div className="menu-item not-allowed">
          <IoCloudUploadSharp className="menu-icon" />
          {/* <Link to="/upload">Upload</Link> */}
          <div>Upload</div>
          <br />
          <br />
        </div>}
        
      </div>

      <br />

      <p className="menu-head">Your Library</p>
      <div className="menu-tab">
        <div className="menu-item">
          <MdCreateNewFolder className="menu-icon" />
          <div onClick={handleOpen}>Create Playlist</div>
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

        {/* <div className="menu-item-list">
          <Newplaylist />
        </div> */}

        <div className="menu-item">
          <VscFeedback className="menu-icon" />
          <Link to="/govern">Govern</Link>
          <br />
          <br />
        </div>
      </div>
      <div>
        <button className="become_artist" onClick={handledisplay}>Become Artist</button>
      </div>
    </div>
  );
};

export default SideNavbar;
