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
          <div className='transac-details'>
              <div className='key-transac'>Date :</div> 
              <div className='val-transac'>{TransactionDate}</div>
          </div>
          <div className='transac-details'>
            <div className='key-transac'>Transaction ID :</div> 
            <div className='val-transac'>{TransactionID}</div>
          </div>
          <div className='transac-details'>
          <div className='key-transac'> Song Purchased :</div> 
            <div className='val-transac'>{SongName}</div>
      
          </div>
        </div>
    </center>

    
  )
}

export default TransactionCard