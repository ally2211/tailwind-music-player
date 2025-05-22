import React from 'react';
import sliderIcon from '../assets/Slider.svg';
import volumeIcon from '../assets/VolumeIcon.svg';

const VolumeControls = ({ volume, setVolume }) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Volume icon */}
      <img src={volumeIcon} alt="Volume" className="w-5 h-5" />

      {/* Slider input */}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        className="w-full accent-blue-500"
      />

      {/* Slider decoration/icon */}
      {/*<img src={sliderIcon} alt="Slider Icon" className="w-5 h-5" />*/}
    </div>
  );
};

export default VolumeControls;
