import React, { useState } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';

const MusicPlayer = () => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="flex flex-col md:flex-row md:gap-8 items-start">
      {/* Left Column - Cover and Info */}
      <div className="md:w-1/2 w-full">
        <CoverArt />
        <SongTitle title="Shining Lights" author="Ally Ray" />
        <PlayControls />
        <VolumeControls volume={volume} setVolume={setVolume} />
      </div>

      {/* Right Column - Playlist */}
      <div className="md:w-1/2 w-full mt-6 md:mt-0">
        <h2 className="text-xl font-bold mb-2">Playlist</h2>
        <div>
          <PlayListItem title="Track One" artist="Artist A" length="3:45" />
          <PlayListItem title="Track Two" artist="Artist B" length="4:12" />
          <PlayListItem title="Track Three" artist="Artist C" length="2:58" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
