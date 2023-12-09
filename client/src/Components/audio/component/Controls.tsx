import { useState, useEffect, useRef, useCallback } from "react";

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
interface Track {
  url: string;
  title: string;
  author: string;
}

type props = {
  audioRef: any;
  progressBarRef: any;
  duration: number;
  setTimeProgress: any;
  tracks: Track[];
  trackIndex: number;
  setTrackIndex: (index: (prev: number) => number) => void;
  setCurrentTrack: (track: Track) => void;
};
const Controls: React.FC<props> = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef<number | null>(null);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      //   setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      //   setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };
  const handleonchange = (e: any) => {
    setVolume(e.target.value);
  };
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <IoPlaySkipBackSharp onClick={handlePrevious} />
        <IoPlayBackSharp onClick={skipBackward } />

        <span onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </span>

        <IoPlayForwardSharp onClick={skipForward} />
        <IoPlaySkipForwardSharp onClick={handleNext} />
      </div>
      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleonchange}
        />
      </div>
    </div>
  );
};

export default Controls;
