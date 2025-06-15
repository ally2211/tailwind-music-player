import React from 'react';
import sliderIcon from '../assets/Slider.svg';
import volumeIcon from '../assets/VolumeIcon.svg';

const VolumeControls = ({ volume, setVolume }) => (
  <div style={{ width: '400px' }} className="mt-4">
    <label className="text-sm">Volume</label>
    <input
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={(e) => setVolume(e.target.value)}
      className="block"
    />
  </div>
);

export default VolumeControls;
