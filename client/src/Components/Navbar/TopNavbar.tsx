import React from 'react'
import '../style/navbar.css';
import { Link} from 'react-router-dom';
type Props = {
  sidenav: Boolean;
  
};
const TopNavbar : React.FC<Props>= ({sidenav}) => {
  return (
    <div className={ ` ${ sidenav ? 'top-navbar':' top-navbar-add' }`}>
        <div className='top-inside'>
            <div>
                <input type="text"  placeholder='search.........'/>
            </div>
            <div>
              <button><Link to='/login'>login</Link></button>
            </div>
        </div>
    </div>
  )
}

export default TopNavbar