import React from 'react'
import '../style/likedSongs.css'
type Props = {
    TransactionID : number;
    TransactionDate : string;
  SongName: string;
 
};

const TransactionCard: React.FC<Props> = ({TransactionID , TransactionDate , SongName}) => {
  return (
    <center className='Liked-card'>
        <div className='playlist-image'>

        </div>
        <div className='song-details'>
            Transaction ID : {TransactionID}
        </div>
        <div className='song-details'>
            Transaction Date : {TransactionDate}
        </div>
        <div className='song-details'>
            Song Purchased : {SongName}
        </div>
    </center>

    
  )
}

export default TransactionCard