"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentGenre } from "@/hooks/current-genre";
import { currentSong } from "@/hooks/current-song";
import { currentSongData } from "@/hooks/current-song-data";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export function SongList() {
  const genre = currentGenre((state) => state.genre);
  const updateSongData = currentSongData((state) => state.updateSongData);
  const [songs, setSongs] = useState([
    { title: "", artist: "", released: null, genre: [] },
  ]);
  const updateSong = currentSong((state) => state.updateSong);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongsByGenre = async () => {
      try {
        setSongs([]);

        const response = await axios.get(
          `http://localhost:4000/songs/${genre}`
        );

        setSongs(response.data.data);
        updateSongData(response.data.data);

        setError(null);
      } catch (error) {
        console.error("Error fetching songs:", error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction onClick={fetchSongsByGenre} altText="Try again">
              Try again
            </ToastAction>
          ),
        });

        setError(error);
      }
    };
    fetchSongsByGenre();
  }, [genre]);

  return (
    <>
      <Table className="w-3/4 mx-auto">
        <TableCaption>A list of songs from selected genre.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/8">No.</TableHead>
            <TableHead className="w-2/5">Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Released</TableHead>
            <TableHead className="w-1/4">Genre</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((s, index) => (
            <TableRow
              className="cursor-pointer"
              key={index}
              onClick={() => {
                updateSong(s);
              }}
            >
              <TableCell className="font-bold">{index + 1}</TableCell>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.artist}</TableCell>
              <TableCell>{s.released}</TableCell>
              <TableCell>{s.genre.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
