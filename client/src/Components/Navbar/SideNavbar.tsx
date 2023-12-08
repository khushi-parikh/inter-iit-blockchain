import React ,{useState} from 'react'
import { Link} from 'react-router-dom';

import '../style/navbar.css'
type Props = {
  sidenav: Boolean;
  text : string;
  // sidenav: (val: string) => void;
  handleclose: () => void;
};
const SideNavbar: React.FC<Props> = () => {
   
  return (
    <div className='side-navbar'>
        <div >
         <Link to='/profile'>profile</Link><br /><br />
         <Link to='/'>Home</Link><br /><br />
         <Link to='/upload'>upload</Link><br /><br />

        </div>
    </div>
  )
}

export default SideNavbar


