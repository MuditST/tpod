import React, { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";

const LyricsViewer = ({ filePath, time }) => {
  const [lyrics, setLyrics] = useState([]);

  const parseLyrics = (text) => {
    const lines = text.split("\n");
    const parsedLyrics = lines.map((line, index) => ({
      id: index,
      lyric: line.trim(),
    }));
    setLyrics(parsedLyrics);
  };
  const parseTLyrics = (text) => {
    const lines = text.split("\n");

    const parsedLyrics = lines.map((line, index) => {
      const [timestamp, lyric] = line.split("|").map((item) => item.trim());

      return {
        id: index,
        lyric: timestamp || null,
        timestamp: lyric || line.trim(),
      };
    });
    setLyrics(parsedLyrics);
  };
  const checkTimeStamp = (text) => {
    if (text.includes("|")) {
      parseTLyrics(text);
    } else {
      parseLyrics(text);
    }
  };
  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`Failed to fetch lyrics (status ${response.status})`);
        }

        const text = await response.text();
        checkTimeStamp(text);
      } catch (error) {
        console.error("Error fetching lyrics:", error.message);
      }
    };

    fetchLyrics();
  }, [filePath]);
  const getCurrentLyrics = () => {
    return lyrics.filter((line) => {
      if (line.timestamp) {
        const startTime = parseFloat(line.timestamp) - 5;
        const endTime = startTime + 8; // Adjust the range as needed
        return time >= startTime && time <= endTime;
      }
      return true;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-8 fixed bottom-36 left-[50%] translate-x-[-50%]">
      {filePath == "/empty.lyrics" ? (
        <div></div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-muted-foreground">
            Lyrics
          </h1>

          <ScrollArea className="h-[30vh] w-full border p-10">
            <ul>
              {getCurrentLyrics().map((line) => (
                <li key={line.id} className="mb-2">
                  {line.lyric}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default LyricsViewer;
