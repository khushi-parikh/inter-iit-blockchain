import React from 'react'
import { Link} from 'react-router-dom';
import '../style/home.css';
import SongCard from '../Music/SongCard';
const Home = () => {

  return (
    <div className='home-page'>
      <div>
        <div >
          <Link to='songpage'>
            <SongCard/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home