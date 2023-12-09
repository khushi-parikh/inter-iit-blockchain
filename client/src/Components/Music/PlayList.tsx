import React ,{useState} from 'react';
import { FaPlay } from "react-icons/fa";
import deva from '../images/deva-deva.jpg';

type Props = {
  PlaylistName: string;
  NumOfSongs : number;
 
};

const PlayList: React.FC<Props> = ({PlaylistName,NumOfSongs}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <center className='playlist-card'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (

        <div className='playlist-image'>
          <img src={deva} alt='song-image' className='card-image'/>
          <center className="show-button">
            <FaPlay className='play-button'/>
        </center>
        </div>
      ) : 
      (
        <div className='playlist-image'>
          <img src={deva} alt='song-image' className='card-image'/>
        </div>
      )}
      <div className='playlist-details'>
          {PlaylistName}
      </div>
      <div className='playlist-details'>
          Number of songs : {NumOfSongs}
      </div>

    </center>

    
  )
}

export default PlayList