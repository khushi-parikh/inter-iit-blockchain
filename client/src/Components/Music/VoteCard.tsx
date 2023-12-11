import React from 'react'
import '../style/likedSongs.css'
import '../style/voteCard.css'
import { BiSolidUpvote } from "react-icons/bi";

interface VoteCardProps {
    SongName: string;
    ArtistName: string;
    Reason: string;
  }

const VoteCard:React.FC<VoteCardProps> = ({SongName,ArtistName,Reason}) => {
  return (
    <center className='Vote-card'>
        <div className="left-side">
          <div className='transac-details'>
              <div className='key-transac'>Song :</div> 
              <div className='val-transac'>{SongName}</div>
          </div>
          <div className='transac-details'>
            <div className='key-transac'>Artist name :</div> 
            <div className='val-transac'>{ArtistName}</div>
          </div>
          <div className='transac-details'>
          <div className='key-transac'> Reason :</div> 
            <div className='val-transac'>{Reason}</div>      
          </div>
        </div>
        <div className="right-side">
            <button className='vote-button'>Vote</button>
        </div>
    </center>

    
  )
}

export default VoteCard