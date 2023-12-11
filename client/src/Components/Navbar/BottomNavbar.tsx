import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import song from '../images/song.jpeg'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // import the styles
import "../style/audioplayer.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Network,Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {PiCoinVertical} from 'react-icons/pi';
import {FcLike} from "react-icons/fc"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
type Props = {
  songUrl: string | null;
  songname: string | null;
  photourl : string ;
  artistname: string | null;
  songUrlArray: string[];
  songNameArray: string[];
  photoUrlArray: string[];

};

const BottomNavbar: React.FC<Props> = ({
  songUrl,
  songname,
  photourl,
  artistname,
  songUrlArray: initialSongUrlArray,
  songNameArray: initialSongNameArray,
  photoUrlArray: initialPhotoUrlArray,
}) => {
  // const [songUrl, setSongUrl] = useState<string | null>(null);
  // console.log("songUrl", songUrl);
  const provider = new Provider(Network.DEVNET);
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const { account, signAndSubmitTransaction } = useWallet();

  console.log('photourl', photourl);
  const [songIndex, setSongIndex] = useState<number>(0);
  const [songRef, setSongRef] = useState<string | null>(null);
  const [songnameref, setSongNameRef] = useState<string | null>(null);
  const [artistnameref, setArtistmNameRef] = useState<string| null>(null)
  const [photourlref,setPhotourlref] = useState<string>("");
  const [liked , setLiked] = useState(false);
 console.log("songname",songname)
  const [songUrlArray, setSongUrlArray] = useState<string[]>(initialSongUrlArray || []);
  const [songNameArray, setSongNameArray] = useState<string[]>(initialSongNameArray || []);
  const [photoUrlArray, setPhotoUrlArray] = useState<string[]>(initialPhotoUrlArray || []);

  // const songs = [
  //   "https://bafybeiewywvxiy2ydgjyxxqj3mrv7nodcdipeyco7yagbzodxuxbyzvfma.ipfs.dweb.link/drive-breakbeat-173062.mp3",
  //   "https://bafybeif2blrai645cdwlofg62b3pwaflqonfb6cwve5crkelfqpdcvvypu.ipfs.nftstorage.link/",
  // ];
  // const name = ["song1", "song2"];
  useEffect(() => {
    setSongUrlArray(initialSongUrlArray || []);
    setSongNameArray(initialSongNameArray || []);
    setPhotoUrlArray(initialPhotoUrlArray || []);
    console.log("inside FIRST use Effect of player songUrlArray", songUrlArray);
  }, [initialSongUrlArray, initialSongNameArray, initialPhotoUrlArray]);
  const [open, setOpen] = React.useState(false);
  const[plus,setplus] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseplus = () => {
    setplus(false);
  };

  const handleOpenplus = () => {
    setplus(true);
  };

  useEffect(() => {
    const fetchSong = async () => {

      if (songUrlArray.length > 0) {
        setSongRef(() => songUrlArray[songIndex]);           
        setSongNameRef(() => songNameArray[songIndex]);
        setPhotourlref(() => photoUrlArray[songIndex]);
      }
      
    };
    fetchSong();
  }, [songIndex,songUrlArray]);
  useEffect(() => {

      setSongRef(songUrl);
      setSongNameRef(songname);
      setPhotourlref(photourl)
      setArtistmNameRef(artistname)
      if (songUrlArray.length > 0) {
      setSongUrlArray(songUrlArray);
      setSongNameArray(songNameArray);
      setPhotoUrlArray(photoUrlArray);
    }

  }, [songUrl,songname,photourl,artistname,songUrlArray,songNameArray,photoUrlArray]);

  const nextSong = () => {
    if (songUrlArray.length > 0) {
      setSongIndex((prevIndex) => (prevIndex + 1) % songUrlArray.length);
    }
  };
  const prevSong = () => {
    const nextIndex = songIndex - 1;
    if (nextIndex < 0) {
      setSongIndex(songUrlArray.length - 1);
    } else {
      setSongIndex(nextIndex);
    }
  };

  const addLikes = async () => {
    if (!account) return [];
    const payload = {
        type: "entry_function_payload",
        function: `${module_address}::Profile::addLike`,
        type_arguments: [],
        arguments: [1],
    };
    try {
        // sign and submit transaction to chain
        console.log("entered try loop for addLikes", payload)
        const response = await signAndSubmitTransaction(payload);
        await provider.waitForTransaction(response.hash);
        setLiked(true);
        console.log("Completed")
    }
    catch (error: any) {
        console.log("ERROR-----", error)
    }
}



  return (
    <div className="bottom-navbar">
      <div className="Song-artist">
        <div className="play-image">
          <img src={photourlref ? photourlref : song} alt="image" />
        </div>
        <div className="play-name">
          <div> {songnameref ?songnameref.slice(0,10): 'Song Name' }</div>
          <div>{artistnameref ? artistnameref : 'Artist Namer' }</div>
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
      {/* <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="liked">
      <FavoriteBorderIcon className="filled-heart-button"/>
      </Tooltip> */}

      <PiCoinVertical className="tip-artist"/>
      {
        liked ? 
        <><FcLike className="filled-heart-button"/></>
        :
        <><FaRegHeart className="filled-heart-button" onClick={addLikes} /></>
      }
      
   
    <Tooltip open={plus} onClose={handleCloseplus} onOpen={handleOpenplus} title="add to playlist">
      <PlaylistAddIcon className="filled-plus-button" />
      
    </Tooltip>
    </div>
  );
};

export default BottomNavbar;
