import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { LiaCoinsSolid } from "react-icons/lia";
import deva from "../images/deva-deva.jpg";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";

type Props = {
  SongName: string;
  ArtistName: string;
  AlbumName: string;
  SongUrl: string;
  PhotoUrl: string;
  Purchase_Status: boolean;
  Song_Price: number;
  purchaseHandler: () => void;
  onPlaySong: (url: string) => void;
    // likeSongHandler: () => void;
};

const SongCard: React.FC<Props> = ({
  SongName,
  ArtistName,
  AlbumName,
  SongUrl,
  PhotoUrl,
  Purchase_Status,
  Song_Price,
  purchaseHandler,
  onPlaySong,
    // likeSongHandler
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked , setIsLiked] = useState(false);
const handleCardClick = () => {
if(Purchase_Status){
    purchaseHandler();
}
}
  const playSong = () => {
    onPlaySong(SongUrl); // Add this line
  };
  return (
    <center
      className="Liked-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {isHovered  ? (
        <>
          <div className="playlist-image">
            <div className="unliked-heart">
                {!isLiked ? 
                (<div className="unliked-heart">
                    {/* <FaRegHeart className="heart-unliked" onClick={likeSongHandler}/> */}
                    </div>
                    ) : 
                    (<div className="unliked-heart">
                    <FcLike className="heart-unliked"/>
                    </div>
                    )
                    }
            </div>
            <img src={PhotoUrl} alt="song-image" className="card-image" />
            <center className="show-button">
              <FaPlay className="play-button"onClick={playSong} />
            </center>
          </div>
        </>
      ) : (
        <>
          <div className="playlist-image">
            <div className="unliked-heart">
                {!isLiked ? (<div className="unliked-heart">
                    <FaRegHeart className="heart-unliked"/>
                    {/* <span className="num-of-likes">100</span> */}
                    </div>
                    ) : 
                    (<div className="unliked-heart">
                    <FcLike className="heart-unliked"/>
                    </div>
                )
                }
            </div>
            <img src={PhotoUrl} alt="song-image" className="card-image" />
          </div>
        </>
      )}
      <div className="bottom-details">
        <div className="songs">
          <div className="song-details">{SongName}</div>
          <div className="song-details">Artist : {ArtistName}</div>
          <div className="song-details">Album : {AlbumName}</div>
        </div>
        <div className={Purchase_Status == true ? "purchase" : "not-purchase"}>
          <LiaCoinsSolid
            className={
              Purchase_Status == true ? "image-show" : "image-not-show"
            }
          />
          <div
            className={Purchase_Status == false ? "show_paid" : "not_show_paid"}
          >
            Paid
          </div>
          <div
            className={
              Purchase_Status == true ? "show_price" : "not-show-price"
            }
          >
            {Song_Price}
          </div>
        </div>
      </div>
    </center>
  );
};

export default SongCard;
