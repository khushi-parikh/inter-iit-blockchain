import React from 'react'
import '../style/likedSongs.css'
import '../style/transaction.css'
import { LiaCoinsSolid } from "react-icons/lia";

type Props = {
    TransactionID : number;
    TransactionDate : string;
  SongName: string;
 
};

const TransactionCard: React.FC<Props> = ({TransactionID , TransactionDate , SongName}) => {
  return (
    <center className='Transaction-card'>
        <div className="left-side">
          <div className='song-details'>
              Date : {TransactionDate}
          </div>
          <div className='song-details'>
              Transaction ID : {TransactionID}
          </div>
          <div className='song-details'>
              Song Purchased : {SongName}
          </div>
        </div>
    </center>

    
  )
}

export default TransactionCard