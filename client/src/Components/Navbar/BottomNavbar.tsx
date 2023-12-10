import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // import the styles

type Props = {
  songUrl: string | null;
};

const BottomNavbar: React.FC<Props> = ({ songUrl }) => {
  // const [songUrl, setSongUrl] = useState<string | null>(null);
  console.log("songUrl", songUrl);
  const [songIndex, setSongIndex] = useState(0);
  const [songRef, setSongRef] = useState<string | null>(null);
  const songs = [
    "https://bafybeiewywvxiy2ydgjyxxqj3mrv7nodcdipeyco7yagbzodxuxbyzvfma.ipfs.dweb.link/drive-breakbeat-173062.mp3",
    "https://bafybeif2blrai645cdwlofg62b3pwaflqonfb6cwve5crkelfqpdcvvypu.ipfs.nftstorage.link/",
  ];

  useEffect(() => {
    const fetchSong = async () => {
      setSongRef(() => songs[songIndex]);
      console.log("inside use Effect of player songUrl", songRef);
    };
    fetchSong();
  }, [songIndex]);
  useEffect(() => {
    setSongRef(songUrl);
    console.log("inside use Effect of player songUrl", songUrl);
  }, [songUrl]);

  const nextSong = () => {
    setSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  const prevSong = () => {
    const nextIndex = songIndex - 1;
    if (nextIndex < 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex(nextIndex);
    }
  };
  return (
    <div className="bottom-inside">
      <div className="bottom-navbar">
        <div className="Song-artist">
          Song name
          <br />
          Artist name - Artist 1
        </div>
        <div className="">
          <AudioPlayer
            autoPlay
            src={songRef ? songRef : undefined}
            onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            onClickNext={nextSong}
            onClickPrevious={prevSong}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
