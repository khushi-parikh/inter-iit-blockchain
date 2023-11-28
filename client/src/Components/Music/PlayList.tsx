import React from 'react'
type Props = {
  PlaylistName: string;
  NumOfSongs : number;
 
};

const PlayList: React.FC<Props> = ({PlaylistName,NumOfSongs}) => {
  return (
    <center className='playlist-card'>
        <div className='playlist-image'>

        </div>
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