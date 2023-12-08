import React from 'react'
import { Link} from 'react-router-dom';
import '../style/home.css';
import SongCard from '../Music/SongCard';
import api from '../API/Songcard.json'
import '../style/songcard.css'

const Home = () => {
  return (
    <div className='home-page'>
      <div>
        {api.map((apimusic , index) => {
          return(
            <div className='temp' >
              <p>{apimusic.title}</p>
              <div className="pc">
                {apimusic.music.map((musicDetails , index) => {
                  return(
                    <SongCard SongName= {musicDetails.Song_name} ArtistName= {musicDetails.Artist_name} AlbumName={musicDetails.Song_Album} Purchase_Status={musicDetails.Purchase_Status} Song_Price={musicDetails.Song_price}/>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home