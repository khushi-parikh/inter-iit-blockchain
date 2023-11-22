import React ,{useState} from 'react'
import { Link} from 'react-router-dom';

import '../style/navbar.css'
type Props = {
  sidenav: Boolean;
  text : string;
  // sidenav: (val: string) => void;
  handleclose: () => void;
};
const SideNavbar: React.FC<Props> = ({ sidenav,text,handleclose}) => {
   
  return (
    <div className={ ` ${ sidenav ? 'side-navbar':'side-navbar side-nav-close' }`}>
        <div >
         <button onClick={()=> handleclose()}>{text}</button>
         <Link to='/profile'>profile</Link>
         <Link to='/'>Home</Link>

        </div>
    </div>
  )
}

export default SideNavbar


