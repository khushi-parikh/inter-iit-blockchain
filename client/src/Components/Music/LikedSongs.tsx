import React from 'react'
import '../style/likedSongs.css'
type Props = {
  SongName: string;
  ArtistName : string;
  AlbumName : string
 
};

const LikedSongs: React.FC<Props> = ({SongName , ArtistName , AlbumName}) => {
  return (
    <center className='Liked-card'>
        <div className='playlist-image'>

        </div>
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