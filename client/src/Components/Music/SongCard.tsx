import React, { useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { LiaCoinsSolid } from "react-icons/lia";

type Props = {
 SongName: string;
 ArtistName : string;
 AlbumName : string;
 Purchase_Status : boolean;
 Song_Price : number
};

const SongCard: React.FC<Props> = ({SongName , ArtistName , AlbumName , Purchase_Status , Song_Price}) => {
const [isHovered, setIsHovered] = useState(false);

 return (
   <center className='Liked-card'
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
   >
    {isHovered ? (
      <>
       <div className='playlist-image'>
        <center className="show-button">
            <FaPlay className='play-button'/>
        </center>
       </div>
      </>
    ) :
    <>
    <div className='playlist-image'>
    </div>
    </> 
    }
    <div className="bottom-details">
      <div className="songs">
        <div className='song-details'>
            {SongName}
        </div>
        <div className='song-details'>
            Artist : {ArtistName}
        </div>
        <div className='song-details'>
            Album : {AlbumName}
        </div>
      </div>
      <div className= {Purchase_Status == true ? "purchase" : "not-purchase" }>
        <LiaCoinsSolid className={Purchase_Status == true ? "image-show" : "image-not-show"} />
        <div className={Purchase_Status == false ? "show_paid" : "not_show_paid"}>Paid</div>
        <div className = {Purchase_Status == true ? "show_price" : "not-show-price"}>
          {Song_Price}
        </div>
      </div>
    </div>
   </center>
 )
}


export default SongCard
