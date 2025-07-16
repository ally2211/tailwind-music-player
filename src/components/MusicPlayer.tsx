import React, { useEffect, useState } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';
import LoadingSkeleton from './LoadingSkeleton';

// TypeScript interfaces
interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  cover?: string;  // Optional cover image URL
  song?: string;   // Optional song audio URL
}

const MusicPlayer: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Helper function to format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('/api/v1/playlist');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const playlistData: Song[] = await response.json();
        setPlaylist(playlistData);
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch playlist');
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const handleSongClick = async (song: Song) => {
    try {
      const response = await fetch(`/api/v1/songs/${song.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const songData: Song = await response.json();
      console.log('Fetched song data:', songData);
      console.log('Cover URL:', songData.cover);
      setCurrentSong(songData);
    } catch (error) {
      console.error('Failed to fetch song details:', error);
      // Fallback to the basic song data if API call fails
      setCurrentSong(song);
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center max-w-[900px] mx-auto p-8">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-inter font-bold mb-2">Error Loading Playlist</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  console.log('Current song:', currentSong);
  console.log('Cover being passed to CoverArt:', currentSong?.cover || "");

  return (
    <div className="flex flex-col sm:flex-row gap-8 max-w-[900px] mx-auto p-8">
      {/* Player Column */}
      <div className="sm:w-1/2">
        <div className="w-full">
          <CoverArt
            cover={currentSong?.cover || ""}
            loading={!currentSong}
          />
          <SongTitle
            title={currentSong?.title || "No song selected"}
            author={currentSong?.artist || "Unknown Artist"}
            className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal"
          />
          <PlayControls
            song={currentSong?.song || ""}
          />
          <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
      </div>

      {/* Playlist Column */}
      <div className="sm:w-1/2 shrink-0">
        <div className="w-full">
          <h2 className="text-xl font-inter font-medium text-warmYellow mb-2">Playlist</h2>
          {playlist.map((song) => (
            <PlayListItem
              key={song.id}
              title={song.title}
              artist={song.artist}
              length={formatDuration(song.duration)}
              className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
              onClick={() => handleSongClick(song)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
