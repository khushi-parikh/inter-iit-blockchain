import React, {useState} from 'react'
import { FaPlay } from "react-icons/fa";
import '../style/likedSongs.css';
import khalasi from '../images/image-750x-2023-07-05-12_42_18pm-64a517d2b355b.jpg';
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";

type Props = {
  SongName: string;
  ArtistName : string;
  AlbumName : string
};

const LikedSongs: React.FC<Props> = ({SongName , ArtistName , AlbumName}) => {
const [isHovered, setIsHovered] = useState(false);
const [isLiked , setIsLiked] = useState(false);

  return (
    <center className='Liked-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

    {isHovered ? (
      <div className='playlist-image'>
        <div className="unliked-heart">
            {
            !isLiked ? 
            (
              <div className="unliked-heart">
                <FaRegHeart className="heart-unliked"/>
              </div>
            ) : 
            (
              <div className="unliked-heart">
                Hello
              <FcLike className="heart-unliked"/>
              </div>
            )
            }
        </div>
        <img src= {khalasi} alt='song-image' className='card-image' />
      <center className="show-button">
        
        <FaPlay className='play-button'/>
    </center>
    </div>
    )
  :(

      <div className='playlist-image'>
        <div className="unliked-heart">
            {!isLiked ? (<div className="unliked-heart">
                <FaRegHeart className="heart-unliked"/>
                </div>
                ) : 
                (<div className="unliked-heart">
                <FcLike className="heart-unliked"/>
                </div>
            )
            }
        </div>
        <img src= {khalasi} alt='song-image' className='card-image' />
      </div>
  )}
  
    <div className='song-details'>
        {SongName}
    </div>
    <div className='song-details'>
        Artist : {ArtistName}
    </div>
    <div className='song-details'>
        Album : {AlbumName}
    </div>
      
    </center>

    
  )
}

export default LikedSongs