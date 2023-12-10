import React,{useState} from 'react'
import Home from '../pages/Home'
import TopNavbar from '../Navbar/TopNavbar'
import SideNavbar from '../Navbar/SideNavbar'
import BottomNavbar from '../Navbar/BottomNavbar'

interface FixedcompProps {
  songUrl: string | null;
 }
const Fixedcomp:React.FC<FixedcompProps> = ({songUrl}) => {
    const [sidenav,setSidenav] = useState(true)
  const [text,setText] = useState('close')
  function handleclose(){
    setSidenav(!sidenav);
    setText(sidenav ? 'close' :   'open');
}
  return (
    <div>
        {/* <Home/> */}
        <SideNavbar sidenav={sidenav} text={text} handleclose={handleclose} />
        <TopNavbar sidenav={sidenav}/>
        <BottomNavbar songUrl={songUrl}/>
    </div>
  )
}

export default Fixedcomp