import React,{useState} from 'react'
import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar '
import {tracks} from '../data/tracks'
import { useRef} from 'react';
import'./audio.css'

const AudioPlayer:React.FC = () => {
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  return (
    <div className="audio-player">
    <div className="inner">
        <div className='leftbpx'>
        <DisplayTrack currentTrack={currentTrack}
        audioRef={audioRef}
        setDuration={setDuration}
        progressBarRef={progressBarRef}
        />
        </div>
        <div className="middlebox">
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef}
        timeProgress ={timeProgress}  duration ={duration}
        />
        </div>
       <div className="rightbox">
       <Controls
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        setTimeProgress ={setTimeProgress}  duration ={duration}
        tracks={tracks} trackIndex={trackIndex} setTrackIndex={setTrackIndex} 
        setCurrentTrack={setCurrentTrack}
        />
       </div>
       
        
        {/* <audio src={currentTrack.src}></audio> */}
    </div>
  </div>
  )
}

export default AudioPlayer