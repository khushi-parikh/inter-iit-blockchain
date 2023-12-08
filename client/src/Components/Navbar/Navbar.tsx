import React,{useState} from 'react'
import TopNavbar from './TopNavbar'
import  SideNavbar  from './SideNavbar'
import BottomNavbar from './BottomNavbar'
const Navbar :React.FC= () => {
    const [sidenav,setSidenav] = useState(true)
  const [text,setText] = useState('close')
  function handleclose(){
    setSidenav(!sidenav);
    setText(sidenav ? 'close' :   'open');
}
  return (
    <div>
        <SideNavbar sidenav={sidenav} text={text} handleclose={handleclose} />
        <TopNavbar sidenav={sidenav}/>
        {/* <BottomNavbar sidenav={sidenav}/> */}
    </div>
  )
}

export default Navbar