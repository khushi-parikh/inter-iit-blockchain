import React,{useState,useEffect} from 'react'
import Home from '../pages/Home'
import TopNavbar from '../Navbar/TopNavbar'
import SideNavbar from '../Navbar/SideNavbar'
import BottomNavbar from '../Navbar/BottomNavbar'

interface FixedcompProps {
  SongID:number|null;
  songUrl: string | null;
  songname: string | null;
  photourl : string;
  artistname: string | null;
  songIDArray:number[];
  songUrlArray: string[];
  songNameArray: string[];
  photoUrlArray: string[];
 }
const Fixedcomp:React.FC<FixedcompProps> = ({SongID,songUrl,songname,photourl,artistname,songIDArray,songUrlArray,songNameArray,photoUrlArray}) => {
  // console.log('nasnksd',photourl)
    const [sidenav,setSidenav] = useState(true)
  const [text,setText] = useState('close')
  function handleclose(){
    setSidenav(!sidenav);
    setText(sidenav ? 'close' :   'open');
}
useEffect(() => { 
  console.log("inside use effect of fixed Comp")
  console.log(songUrlArray) 
},[songUrlArray])
  return (
    <div>
        {/* <Home/> */}
        <SideNavbar sidenav={sidenav} text={text} handleclose={handleclose} />
        <TopNavbar sidenav={sidenav}/>
        <BottomNavbar SongID={SongID} songUrl={songUrl} songname={songname} photourl={photourl} artistname={artistname} songIDAarray={songIDArray} songUrlArray={songUrlArray}songNameArray={songNameArray} photoUrlArray={photoUrlArray}/>
    </div>
  )
}

export default Fixedcomp