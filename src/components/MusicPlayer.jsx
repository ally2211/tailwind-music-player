import React, { useState } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';

const MusicPlayer = () => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="flex flex-col sm:flex-row gap-8 max-w-[900px] mx-auto p-8">
      {/* Player Column */}
      <div className="sm:w-1/2 shrink-0">
        <div className="w-full">
          <CoverArt />
          <SongTitle title="My Song" author="Artist Name" />
          <PlayControls />
          <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
      </div>

      {/* Playlist Column */}
      <div className="sm:w-1/2 shrink-0">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2">Playlist</h2>
          <PlayListItem title="Track One" artist="Artist A" length="3:45" />
          <PlayListItem title="Track Two" artist="Artist B" length="4:12" />
          <PlayListItem title="Track Three" artist="Artist C" length="2:58" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
