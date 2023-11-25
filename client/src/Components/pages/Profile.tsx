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

const Profile = () => {
  var count = Object.keys(api).length;
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
        <div className='Playlists'>
          <div className='playlist-heading'>
            Your Playlists
          </div>
          {api.map((apimusic , index) => {
            return(
              <div className="pc">
                  <PlaylistCard PlaylistName={apimusic.PlaylistName} NumOfSongs={apimusic.Songs.length}/>
              </div>
            )
          })}
        </div>

        <div className='Playlists'>
          <div className='playlist-heading'>
            Liked Songs
          </div>
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>

        <div className='Playlists'>
          <div className='playlist-heading'>
            Recent Songs
          </div>
          {likedSongsApi.map((apimusic , index) => {
            return(
              <div className="pc">
                 <LikedSongCard SongName= {apimusic.SongTitle} ArtistName= {apimusic.ArtistName} AlbumName= {apimusic.AlbumName}/>
              </div>
            )
          })}
        </div>

        <div className='Playlists'>
          <div className='playlist-heading'>
            Transaction History
          </div>
          {Transaction.map((apimusic , index) => {
            return(
              <div className="pc">
                 <TransactionCard TransactionID={apimusic.Transaction_ID} TransactionDate={apimusic.Transaction_Date} SongName={apimusic.Song_Purchased} />
              </div>
            )
          })}
        </div>

        <br />

      </div>
      
    </div>
  )
}

export default Profile