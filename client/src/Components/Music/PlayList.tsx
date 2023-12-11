import React ,{useState} from 'react';
import { FaPlay } from "react-icons/fa";
import deva from '../images/deva-deva.jpg';
import '../style/playlist.css';
import PlaylistCard from '../Music/PlaylistCard';

type Props = {
  PlaylistName: string;
  NumOfSongs : number;
 
};

const PlayList: React.FC<Props> = ({PlaylistName,NumOfSongs}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='page'>
      <div className="playlist-box">
        <div className="playlist-head">
          <div className='playlist-name'>Playlist : {PlaylistName}</div>
          <div className='song-count'>Number of Songs : {NumOfSongs}</div>
        </div>    
        <PlaylistCard/>  
      </div>
    </div>
    
  )
}

export default PlayList