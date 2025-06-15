import React from 'react';
import volumeIcon from '../assets/VolumeIcon.svg';

const VolumeControls = ({ volume, setVolume }) => (
  <div className="mt-4 w-[400px]">
    <div className="flex items-center gap-3">
      <img src={volumeIcon} alt="Volume Icon" className="w-6 h-6" />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full"
      />
    </div>
  </div>
);

export default VolumeControls;
