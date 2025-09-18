import React, { useEffect, useState } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';
import LoadingSkeleton from './LoadingSkeleton';

const MusicPlayer = () => {
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    // Simulate async data load
    setTimeout(() => {
      const songs = [
        {
          title: 'Painted in Blue',
          artist: 'Soul Canvas',
          length: '3:45',
          coverImage: null // You can add cover image URLs here
        },
        {
          title: 'Title Drift',
          artist: 'Echos of Seas',
          length: '4:12',
          coverImage: null
        },
        {
          title: 'Fading Shadow',
          artist: 'The Emberight',
          length: '2:58',
          coverImage: null
        },
      ];
      setPlaylist(songs);
      setCurrentSong(songs[0]); // Set first song as default
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="flex flex-col sm:flex-row gap-8 max-w-[900px] mx-auto p-8">
      {/* Player Column */}
      <div className="sm:w-1/2 ">
        <div className="w-full">
          <CoverArt
            coverImage={currentSong?.coverImage}
            title={currentSong?.title}
          />
          <SongTitle
            title={currentSong?.title || "My Song"}
            author={currentSong?.artist || "Artist Name"}
            className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal"
          />
          <PlayControls />
          <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
      </div>

      {/* Playlist Column */}
      <div className="sm:w-1/2 shrink-0">
        <div className="w-full">
          <h2 className="text-xl font-inter font-medium text-warmYellow mb-2">Playlist</h2>
          {playlist.map((song, index) => (
            <div key={index} className="mb-2">
              <PlayListItem
                title={song.title}
                artist={song.artist}
                length={song.length}
                onClick={() => handleSongSelect(song)}
                isActive={currentSong?.title === song.title}
                className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
