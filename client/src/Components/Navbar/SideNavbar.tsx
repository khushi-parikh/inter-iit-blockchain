import React ,{useState} from 'react'
import { Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import '../style/navbar.css'
import { IoCloudUploadSharp } from "react-icons/io5";
import aptosLogo from '../images/Aptos_logo.png';
import { MdCreateNewFolder } from "react-icons/md";

type Props = {
  sidenav: Boolean;
  text : string;
  // sidenav: (val: string) => void;
  handleclose: () => void;
};
const SideNavbar: React.FC<Props> = () => {
   
  return (
    <div className='side-navbar'>
      <div className="logo-items">
        <img src={aptosLogo} alt='aptos-logo' className='app-logo'/>
        <p>Aptos</p>
      </div>
      <p className='menu-head'>Menu</p>
      <div className='menu-tab'>
        <div className="menu-item">
          <FaHome className='menu-icon'/>
          <Link to='/'>Home</Link><br /><br />
        </div>
        <div className="menu-item">
          <CgProfile className='menu-icon'/>
          <Link to='/profile'>Profile</Link><br /><br />
        </div>
        <div className="menu-item">
          <IoCloudUploadSharp className='menu-icon'/>
          <Link to='/upload'>Upload</Link><br /><br />
        </div>

      </div>

      <br />

      <p className='menu-head'>Your Library</p>
      <div className='menu-tab'>
        <div className="menu-item">
          <MdCreateNewFolder className='menu-icon'/>
          <Link to='/'>Create Playlist</Link><br /><br />
        </div>

        <div className="menu-item">
          <MdCreateNewFolder className='menu-icon'/>
          <Link to='/govern'>Govern</Link><br /><br />
        </div>
      </div>
    </div>
  )
}

export default SideNavbar


