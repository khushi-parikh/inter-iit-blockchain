import React from 'react'
import '../style/profile.css'
import api from '../API/Playlist.json'
import PlaylistCard from '../Music/PlayList'
import { Link } from 'react-router-dom'
import '../style/playlist.css'
import likedSongsApi from '../API/LikedSong.json'
import LikedSongCard from '../Music/LikedSongs'
import Transaction from '../API/Transaction.json'
import TransactionCard from '../Music/TransactionCard'
import {useState} from 'react';

 


const Profile = () => {
  
  var count = Object.keys(api).length;
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (args: number) => {
    setActiveTab(args);
   };
   


  const playlistContent = () =>{
    return (
      <div className='Playlists'>
          {api.map((apimusic , index) => {
            return(
              <div className="pc">
                  <PlaylistCard PlaylistName={apimusic.PlaylistName} NumOfSongs={apimusic.Songs.length}/>
              </div>
            )
          })}
      </div>
    );
  }

  const likedSongContent = () => {
    return (
      <div className='Playlists'>
          
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>
    );
  }

  const recentSongContent = () => {
    return(
      <div className='Playlists'>
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>
    )
  }

  const transactionContent = () => {
    return(

    <div className='Playlists'>
          {Transaction.map((apimusic , index) => {
            return(
              <div className="pc">
                 <TransactionCard TransactionID={apimusic.Transaction_ID} TransactionDate={apimusic.Transaction_Date} SongName={apimusic.Song_Purchased} />
              </div>
            )
          })}
        </div>
    )
  }

  function Tabs({ activeTab }: { activeTab: number }) {
    switch (activeTab) {
      case 0:
        return playlistContent();
      case 1:
        return likedSongContent();
      case 2:
        return recentSongContent();
      case 3:
        return transactionContent();
      default:
        return <div>No tab selected</div>;
    }
   }

  return (
    <div className='profile-page'>

      <div className='profile-header'>
        <div className='profile-header-start'>
          <p>Profile Details</p>
        </div>
        <div className='profile-header-start-h1'>
          <h1>User key : 123ABCD</h1>
        </div>
        <div className='profile-header-start'>
          <p>Playlists : {count} </p>
        
        </div>
      </div>

      <div className='temp'>
          <div className='tabs'>
            <button onClick={() => {handleTabChange(0)}} className= {activeTab == 0? "active-button" : "non-active-button" }>Your Playlist</button>
            <button onClick={() => {handleTabChange(1)}} className= {activeTab == 1? "active-button" : "non-active-button" }>Liked Songs</button>
            <button onClick={() => {handleTabChange(2)}} className= {activeTab == 2? "active-button" : "non-active-button" }>Recent Songs</button>
            <button onClick={() => {handleTabChange(3)}} className= {activeTab == 3? "active-button" : "non-active-button" }>Transaction History</button>

          </div>
          
          
          {Tabs({ activeTab })}

          <br />

      </div>
      
    </div>
  )
}

export default Profile