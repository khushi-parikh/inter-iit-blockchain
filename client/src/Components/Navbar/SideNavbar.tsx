import React ,{useState} from 'react'
import { Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import '../style/navbar.css'
import { IoCloudUploadSharp } from "react-icons/io5";
import aptosLogo from '../images/communityIcon_whq55kvqd3w91.jpg';

type Props = {
  sidenav: Boolean;
  text : string;
  // sidenav: (val: string) => void;
  handleclose: () => void;
};
const SideNavbar: React.FC<Props> = () => {
   
  return (
    <div className='side-navbar'>
      <img src={aptosLogo} alt='aptos-logo' className='app-logo'/>
      <p className='menu-head'>Menu</p>
        <div >
          <div className="menu-item">
            <FaHome className='menu-icon'/>
            <Link to='/'>Home</Link><br /><br />
          </div>
          <div className="menu-item">
            <CgProfile className='menu-icon'/>
            <Link to='/profile'>profile</Link><br /><br />
          </div>
          <div className="menu-item">
            <IoCloudUploadSharp className='menu-icon'/>
            <Link to='/upload'>upload</Link><br /><br />
          </div>

        </div>
    </div>
  )
}

export default SideNavbar


