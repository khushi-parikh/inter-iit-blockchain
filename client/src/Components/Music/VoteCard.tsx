import React from 'react'
import '../style/likedSongs.css'
import '../style/voteCard.css'
import { BiSolidUpvote } from "react-icons/bi";

const VoteCard = () => {
  return (
    <center className='Vote-card'>
        <div className="left-side">
          <div className='transac-details'>
              <div className='key-transac'>Song :</div> 
              <div className='val-transac'>Song 1</div>
          </div>
          <div className='transac-details'>
            <div className='key-transac'>Artist name :</div> 
            <div className='val-transac'>Artist 1</div>
          </div>
          <div className='transac-details'>
          <div className='key-transac'> Reason :</div> 
            <div className='val-transac'>So monotonous</div>      
          </div>
        </div>
        <div className="right-side">
            <button className='vote-button'>Vote</button>
        </div>
    </center>

    
  )
}

export default VoteCard