import React from "react";
import "../style/navbar.css";  
import AudioPlayer from "../audio/component/AudioPlayer";
type Props = {
  sidenav: Boolean;
  
};

let qala = require("./qala.mp3");

const BottomNavbar : React.FC<Props>= () => {
  return (
    <div className="bottom-inside">
      <div className="bottom-navbar">
        <audio src="https://bafybeiewywvxiy2ydgjyxxqj3mrv7nodcdipeyco7yagbzodxuxbyzvfma.ipfs.nftstorage.link/drive-breakbeat-173062.mp3">d</audio>
        {/* <AudioPlayer/> */}
        <audio src={qala}></audio>
      </div>
    </div>
  );
};

export default BottomNavbar;
