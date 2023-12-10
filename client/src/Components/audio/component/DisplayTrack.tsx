import React from 'react'
import { BsMusicNoteBeamed } from 'react-icons/bs';
interface Track {
    src: string;
    title : string;
    author: string;
   }


type Props = {
    currentTrack: Track;
    audioRef:any;
    setDuration:any;
    progressBarRef:any
   };
const DisplayTrack: React.FC<Props> = ({ currentTrack,audioRef ,setDuration, progressBarRef}) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
      };
      
  return (
    <div>
         <audio src={currentTrack.src} ref={audioRef}
         onLoadedMetadata={onLoadedMetadata}
          />
         <div className="audio-info">
         <div className="audio-image">
          {/* {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )} */}
          <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
        </div>
         <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
         </div>
  )
}

export default DisplayTrack