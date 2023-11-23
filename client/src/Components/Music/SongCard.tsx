import React from 'react'
import '../style/songcard.css'
type Props = {
  Songname: string;
  Artistname : string;
 
};
// function cards(){
//   for(var i =0 ; i<3 ; i++){
//     let row = document.getElementById(card);
//   }
// }
const SongCard: React.FC<Props> = ({Songname,Artistname}) => {
  return (
    
      
      <div className='cards'>
        <div id='card'>
          <div className='song-image'>

          </div>

          <div className='song-details'>
            <div className='song-name'>
              {Songname}
            </div>
            <div className='artist-name'>
              {Artistname}
            </div>
          </div>

          <div className='song-details'>
            <div className='album-name'>
              Song Album
            </div>
          </div>

          

        </div>

      </div>
    

    
  )
}

export default SongCard