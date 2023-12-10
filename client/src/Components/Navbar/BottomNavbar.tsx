import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import image from '../images/deva-deva.jpg'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // import the styles
import "../style/audioplayer.css";
import { FaRegHeart } from "react-icons/fa6";

type Props = {
  songUrl: string | null;
  songname: string | null;
  photourl : string ;
  albumname: string | null;
  songUrlArray: string[];
  songNameArray: string[];
  photoUrlArray: string[];

};

const BottomNavbar: React.FC<Props> = ({ songUrl, songname,photourl,albumname,songUrlArray,songNameArray,photoUrlArray }) => {
  // const [songUrl, setSongUrl] = useState<string | null>(null);
  // console.log("songUrl", songUrl);
  console.log('photourl', photourl);
  const [songIndex, setSongIndex] = useState<number>(0);
  const [songRef, setSongRef] = useState<string | null>(null);
  const [songnameref, setSongNameRef] = useState<string | null>(null);
  const [albumnameref, setAlbumNameRef] = useState<string| null>(null)
  const [photourlref,setPhotourlref] = useState<string>("");
  const [songRefArray, setSongRefArray] = useState<string[]>([]);
  const [photourlrefArray, setPhotourlrefArray] =useState<string[] >([]);
  const [songNameRefArray, setSongNameRefArray] = useState<string[]>([]);
  // const songs = [
  //   "https://bafybeiewywvxiy2ydgjyxxqj3mrv7nodcdipeyco7yagbzodxuxbyzvfma.ipfs.dweb.link/drive-breakbeat-173062.mp3",
  //   "https://bafybeif2blrai645cdwlofg62b3pwaflqonfb6cwve5crkelfqpdcvvypu.ipfs.nftstorage.link/",
  // ];
  // const name = ["song1", "song2"];
 console.log("songname",songname)
  useEffect(() => {
    const fetchSong = async () => {
      console.log("fetching song")
      console.log(songUrlArray)
      console.log("setting song url to: " + songRefArray[songIndex])
      if (songRefArray.length > 0) {
        setSongRef(() => songRefArray[songIndex]);           
        setSongNameRef(() => songNameRefArray[songIndex]);
        setPhotourlref(() => photourlrefArray[songIndex]);
      }
      console.log("inside use Effect of player songUrl", songRef);
      
    };
    fetchSong();
  }, [songIndex,songRefArray]);
  useEffect(() => {

      setSongRef(songUrl);
      setSongNameRef(songname);
      setPhotourlref(photourl)
      setAlbumNameRef(albumname)
      if (songUrlArray.length > 0) {
      setSongRefArray(songUrlArray);
      setSongNameRefArray(songNameArray);
      setPhotourlrefArray(photoUrlArray);
    }

  }, [songUrl,songname,photourl,albumname,songUrlArray,songNameArray,photoUrlArray]);

  const nextSong = () => {
    console.log("inside use Effect of nextSong");
    console.log(songRefArray)
    console.log("ref array length: " + songRefArray.length)
    console.log("index no",songIndex);
    if (songRefArray.length > 0) {
      setSongIndex((prevIndex) => (prevIndex + 1) % songRefArray.length);
    }
  };
  const prevSong = () => {
    const nextIndex = songIndex - 1;
    if (nextIndex < 0) {
      setSongIndex(songRefArray.length - 1);
    } else {
      setSongIndex(nextIndex);
    }
  };
  return (
    <div className="bottom-navbar">
      <div className="Song-artist">
        <div className="play-image">
          <img src={photourlref} alt="image" />
          {/* {photourlref}  */}
        </div>
        <div className="play-name">
          <div> Song name -{songnameref}</div>
          <div>Artist name - {albumnameref}</div>
        </div>

      </div>

      <div className="play-music">
        <AudioPlayer
          autoPlay
          src={songRef ? songRef : undefined}
          onPlay={(e) => console.log("onPlay")}
          showSkipControls={true}
          onClickNext={nextSong}
          onClickPrevious={prevSong}
          style={{
            background: "transparent",
            width: "200%",
            outline: "none",
            color: "white",
          }}
        />
      </div>

      <FaRegHeart className="filled-heart-button"/>
      
    </div>
  );
};

export default BottomNavbar;
