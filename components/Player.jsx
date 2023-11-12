"use client";
import { Pause, Play, StepBack, StepForward } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { currentSongData } from "@/hooks/current-song-data";
import { currentSong } from "@/hooks/current-song";
import LyricsViewer from "./LyricsViewer";

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  let formattedMinutes = "";
  let formattedSeconds = "";
  formattedMinutes = String(minutes).padStart(2, "0");
  formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

const Player = () => {
  const songData = currentSongData((state) => state.songData);
  const song = currentSong((state) => state.song);
  const [songState, setSongState] = useState({
    title: "",
    artist: "",
    released: null,
    genre: [],
  });
  useEffect(() => {
    setSongState(song);
  }, [song]);

  const updateSong = currentSong((state) => state.updateSong);
  const [songPath, setSongPath] = useState("empty");
  const songName = songState.title;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef();

  useEffect(() => {
    const convertedSongName = songName
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/gi, "")
      .toLowerCase();
    setSongPath(`${convertedSongName}`);
    setIsPlaying(false);
  }, [songState]);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying]);
  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBack = () => {
    let index = songData.findIndex((x) => x.title == songName);
    if (index == 0) {
      updateSong(songData[songData.length - 1]);
    } else {
      updateSong(songData[index - 1]);
    }
    audioElement.current.currentTime = 0;
    setIsPlaying(false);
  };
  const skipNext = () => {
    let index = songData.findIndex((x) => x.title == songName);
    if (index == songData.length - 1) {
      updateSong(songData[0]);
    } else {
      updateSong(songData[index + 1]);
    }
    audioElement.current.currentTime = 0;
    setIsPlaying(false);
  };
  const [ct, setCt] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const ct = audioElement.current.currentTime;

    if (ct === duration) {
      setIsPlaying(false);
    }
    setProgressValue((ct / duration) * 100);
    setCurrentTime(formatDuration(ct));
    setCt(Math.floor(ct));
    setTotalDuration(formatDuration(duration));
  };

  return (
    <>
      <div className="fixed bottom-0 bg-background h-32 w-full border-t-2 flex flex-col justify-center items-center z-10">
        <audio
          onTimeUpdate={onPlaying}
          ref={audioElement}
          src={`/${songPath}.mp3`}
        />
        {isPlaying ? (
          <div className="flex justify-between items-center w-4/5 my-2">
            <p className=" text-sm">{currentTime}</p>

            <h1 className="text-muted-foreground">{songState.title}</h1>

            <p className="text-sm">{totalDuration}</p>
          </div>
        ) : (
          <div className="flex justify-center items-center w-4/5 my-2">
            <h1 className=" text-muted-foreground">{songState.title}</h1>
          </div>
        )}

        <Progress value={progressValue} className="w-4/5 h-3 mt-2" />
        <div className="w-1/4 h-full flex items-center justify-around text-accent">
          <StepBack
            onClick={skipBack}
            className="hover:text-primary hover:cursor-pointer hover:scale-105 transition duration-100"
            size={36}
          />
          {isPlaying ? (
            <Pause
              onClick={PlayPause}
              className="hover:text-primary hover:cursor-pointer hover:scale-105 transition duration-100"
              size={36}
            />
          ) : (
            <Play
              onClick={PlayPause}
              className="hover:text-primary hover:cursor-pointer hover:scale-105 transition duration-100"
              size={36}
            />
          )}

          <StepForward
            onClick={skipNext}
            className="hover:text-primary hover:cursor-pointer hover:scale-105 transition duration-100"
            size={36}
          />
        </div>
      </div>

      {isPlaying && <LyricsViewer filePath={`/${songPath}.lyrics`} time={ct} />}
    </>
  );
};

export default Player;
