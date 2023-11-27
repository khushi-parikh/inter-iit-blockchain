import React from 'react'
import { Link} from 'react-router-dom';
import '../style/home.css';
import SongCard from '../Music/SongCard';
import api from '../API/Songcard.json'
import '../style/songcard.css'

const Home = () => {
  return (
    <div className='home-page'>
      <div  className='card-container'>
        {api.map((apimusic,index)=>{
          return(
        <div>
          <p>{apimusic.title}</p>
          <div>
            
            {apimusic.music.map((musicdetail,index)=>{
            return(
        
            <Link to='songpage' >
              <SongCard Songname={musicdetail.Song_name} Artistname ={musicdetail.Artist_name} />
            </Link>
          
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