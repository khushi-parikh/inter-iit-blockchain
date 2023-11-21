import React from 'react'
import { Link} from 'react-router-dom';
import '../style/home.css';
import SongCard from '../Music/SongCard';
const Home = () => {

  return (
    <div className='home-page'>
      <div>
        <h1>trending songs</h1>
        <div >
          <Link to='songpage'><SongCard  />
          </Link>
            
        </div>
      </div>
    </div>
  )
}

export default Home