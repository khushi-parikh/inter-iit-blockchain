import React from "react";
import "../style/navbar.css";
import AudioPlayer from "../audio/component/AudioPlayer";
type Props = {
  sidenav: Boolean;
  
};

const BottomNavbar : React.FC<Props>= () => {
  return (
    <div className="bottom-inside">
      <div className="bottom-navbar">
        <AudioPlayer/>
      </div>
    </div>
  );
};

export default BottomNavbar;
