import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import "./App.css";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

import PageNotFound from "./Components/pages/PageNotFound";
import Home from "./Components/pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/pages/Profile";
import Login from "./Components/pages/Login";
import Fixedcomp from "./Components/fixed/Fixedcomp";
import SongPage from "./Components/Music/SongPage";
import PlayList from "./Components/Music/PlayList";
import Upload from "./Components/pages/Upload";
import Govern from "./Components/pages/Govern";
import Newplaylist from "./Components/pages/Newplaylist";

// import Appdemo from './Components/demo-music/Appdemo';

type AppProps = {
  songUrl: string | null;
  songArtist: string | null;
};
function App() {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [songname, setSongName] = useState<string | null>(null);
  const [photourl, setPhotourl] = useState<string>("");
  const [artistname, setArtistname] = useState<string | null>(null);
  const [songUrlArray, setSongUrlArray] = useState<string[]>([]);
  const [songNameArray, setSongNameArray] = useState<string[]>([]);
  const [photoUrlArray, setPhotourlArray] = useState<string[]>([]);

  const [songArtist, setSongArtist] = useState<string | null>(null);
  const handlePlaySong = (
    url: string,
    songName: string,
    photourl: string,
    artistname: string
  ) => {
    console.log("clicked play song");
    console.log(url);
    setSongUrl(url);
    setSongName(songName);
    setPhotourl(photourl);
    setArtistname(artistname);
  };

  const handlePlaySOngArray = (
    url: string[],
    songName: string[],
    photourl: string[]
  ) => {
    console.log("inside handle play song array");
    console.log(url);
    setSongUrlArray(url);
    setSongNameArray(songName);
    setPhotourlArray(photourl);
  };

  return (
    <div>
      <BrowserRouter>
        <Fixedcomp
          songUrl={songUrl}
          songname={songname}
          photourl={photourl}
          artistname={artistname}
          songUrlArray={songUrlArray}
          songNameArray={songNameArray}
          photoUrlArray={photoUrlArray}
        />
    <Routes>
      <Route path="/" element={<Home onPlaySong={handlePlaySong} onPlaySongArray={handlePlaySOngArray}/>} />
      <Route path="/songpage" element={<SongPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/profile" element={<Profile onPlaySong={handlePlaySong}/>} />
      <Route path="/Playlist" element={<PlayList PlaylistName={''} NumOfSongs={0}/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path='/govern' element = {<Govern/>}/>
      <Route path='/newplaylist' element = {<Newplaylist/>}/>


      {/* <Route path="/feedback" element = {<Feedback/>}/> */}
      {/* <Route path="/App" element={<Appdemo/>} /> */}


      

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
