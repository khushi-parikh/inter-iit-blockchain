import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import song from "../images/song.jpeg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // import the styles
import "../style/audioplayer.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Network, Provider } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { PiCoinVertical } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SimplePopup from "./SimplePopup";
type Props = {
  SongID: number | null;
  songUrl: string | null;
  songname: string | null;
  photourl: string;
  artistname: string | null;
  songIDAarray: number[];
  songUrlArray: string[];
  songNameArray: string[];
  photoUrlArray: string[];
};
type Song = {
  album_id: BigInt;
  artist_address: string;
  cid: string;
  current_price: BigInt;
  date: string;
  duration: BigInteger;
  genre: string;
  name: string;
  num_likes: BigInt;
  num_streams: BigInt;
  previewEnd: BigInt;
  previewStart: BigInt;
  song_id: BigInt;
};
type EntryFunctionId = string;
type MoveType = string;
type ViewRequest = {
  function: EntryFunctionId;
  type_arguments: Array<MoveType>;
  arguments: Array<any>;
};
const BottomNavbar: React.FC<Props> = ({
  SongID,
  songUrl,
  songname,
  photourl,
  artistname,
  songUrlArray: initialSongUrlArray,
  songIDAarray: initialSongIDAarray,
  songNameArray: initialSongNameArray,
  photoUrlArray: initialPhotoUrlArray,
}) => {
  // const [songUrl, setSongUrl] = useState<string | null>(null);
  // console.log("songUrl", songUrl);
  const provider = new Provider(Network.DEVNET);
  const module_address = process.env.REACT_APP_MODULE_ADDRESS;
  const { account, signAndSubmitTransaction } = useWallet();

  console.log("photourl", photourl);
  const [songIndex, setSongIndex] = useState<number>(0);
  const [songRef, setSongRef] = useState<string | null>(null);
  const [songID, setSongID] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [songIDAarray, setSongIDAarray] = useState<number[]>(
    initialSongIDAarray || []
  );
  const [songnameref, setSongNameRef] = useState<string | null>(null);
  const [artistnameref, setArtistmNameRef] = useState<string | null>(null);
  const [photourlref, setPhotourlref] = useState<string>("");
  const [liked, setLiked] = useState(false);
  console.log("songname", songname);
  const [songUrlArray, setSongUrlArray] = useState<string[]>(
    initialSongUrlArray || []
  );
  const [songNameArray, setSongNameArray] = useState<string[]>(
    initialSongNameArray || []
  );
  const [photoUrlArray, setPhotoUrlArray] = useState<string[]>(
    initialPhotoUrlArray || []
  );

  // const songs = [
  //   "https://bafybeiewywvxiy2ydgjyxxqj3mrv7nodcdipeyco7yagbzodxuxbyzvfma.ipfs.dweb.link/drive-breakbeat-173062.mp3",
  //   "https://bafybeif2blrai645cdwlofg62b3pwaflqonfb6cwve5crkelfqpdcvvypu.ipfs.nftstorage.link/",
  // ];
  // const name = ["song1", "song2"];
  useEffect(() => {
    setSongIDAarray(initialSongIDAarray || []);
    setSongUrlArray(initialSongUrlArray || []);
    setSongNameArray(initialSongNameArray || []);
    setPhotoUrlArray(initialPhotoUrlArray || []);
    console.log("inside FIRST use Effect of player songUrlArray", songUrlArray);
  }, [initialSongIDAarray,initialSongUrlArray, initialSongNameArray, initialPhotoUrlArray]);
  const [open, setOpen] = React.useState(false);
  const [plus, setplus] = React.useState(false);

  useEffect(()=>{
    fetchLikedSongs();
  },[])

  const fetchLikedSongs = async () => {
      if (!account) return [];
      const payload: ViewRequest = {
        function: `${module_address}::Profile::viewLikedSongsMain`,
        type_arguments: [],
        arguments: [account?.address],
      };
      try {
        const response = await provider.view(payload);
        // console.log("Liked songs");
        // console.log(response);
        setLikedSongs(JSON.parse(JSON.stringify(response)));
        console.log(likedSongs);
      } catch (error: any) {
        console.error("Error getting liked songs:", error);
      }
  }

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

  const isLiked= async(song_id:any)=>{

    if (!account) return [];
    const payload:ViewRequest={
      function:`${module_address}::Profile::isLiked`,
      type_arguments:[],
      arguments:[account?.address,song_id]
    }
    try{
      const response=await provider.view(payload);
      setLiked(JSON.parse(JSON.stringify(response)));
    }catch{

    }
  }

  useEffect(()=>{
  isLiked(songID)
  },[songID])

  useEffect(() => {
    const fetchSong = async () => {
      if (songUrlArray.length > 0) {
        setSongID(()=>songIDAarray[songIndex]);
        setSongRef(() => songUrlArray[songIndex]);
        setSongNameRef(() => songNameArray[songIndex]);
        setPhotourlref(() => photoUrlArray[songIndex]);
      }
    };
    fetchSong();
  }, [songIndex, songUrlArray]);
  useEffect(() => {
    setSongID(SongID);
    setSongRef(songUrl);
    setSongNameRef(songname);
    setPhotourlref(photourl);
    setArtistmNameRef(artistname);
    if (songUrlArray.length > 0) {
      setSongIDAarray(songIDAarray);
      setSongUrlArray(songUrlArray);
      setSongNameArray(songNameArray);
      setPhotoUrlArray(photoUrlArray);
    }
  }, [
    songUrl,
    songname,
    photourl,
    artistname,
    songUrlArray,
    songNameArray,
    photoUrlArray,
    songIDAarray,
    songID,
  ]);

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

  const addLikes = async (song_id:any) => {
    if (!account) return [];
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::addLike`,
      type_arguments: [],
      arguments: [song_id],
    };
    try {
      // sign and submit transaction to chain
      console.log("entered try loop for addLikes", payload);
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      setLiked(true);
      console.log("Completed");
    } catch (error: any) {
      console.log("ERROR-----", error);
    }
  };
  const deleteLike = async (song_id:any) => {
    if (!account) return [];
    const payload = {
      type: "entry_function_payload",
      function: `${module_address}::Profile::deleteLike`,
      type_arguments: [],
      arguments: [song_id],
    };
    try {
      // sign and submit transaction to chain);
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      setLiked(false);
      console.log("Completed");
    } catch (error: any) {
      console.log("ERROR-----", error);
    }
  };

  return (
    <div className="bottom-navbar">
      <div className="Song-artist">
        <div className="play-image">
          <img src={photourlref ? photourlref : song} alt="image" />
        </div>
        <div className="play-name">
          <div> {songnameref ? songnameref.slice(0, 10) : "Song Name"}</div>
          <div>{artistnameref ? artistnameref : "Artist Namer"}</div>
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

      <PiCoinVertical className="tip-artist" />
      {liked ? (
        <>
          <FcLike className="filled-heart-button" onClick={()=>{deleteLike(songID)}} />
        </>
      ) : (
        <>
          <FaRegHeart className="filled-heart-button" onClick={()=>{addLikes(songID)}}/>
        </>
      )}

      <Tooltip
        open={plus}
        onClose={handleCloseplus}
        onOpen={handleOpenplus}
        title="add to playlist"
      >
        <PlaylistAddIcon className="filled-plus-button" />
      </Tooltip>
      <div className="popup-button">
        <SimplePopup />
      </div>
    </div>
  );
};

export default BottomNavbar;
