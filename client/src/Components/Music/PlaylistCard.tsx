import React from "react";
import '../style/playlist.css';
import deva from '../images/deva-deva.jpg';
import { FaPlay } from "react-icons/fa";

const PlaylistCard = () => {
    return(
        <center>
            <center className='Play-card'>
                <img src={deva} alt=""/>
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
                        <div className='key-transac'>Likes :</div> 
                        <div className='val-transac'>100</div>
                    </div>    
                </div>

                <div className="right-side">
                    <FaPlay/>
                </div>
            </center>
        </center>
    )
}

export default PlaylistCard ;