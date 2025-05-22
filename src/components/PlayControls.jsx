import React from 'react';
import backIcon from '../assets/BackIcon.svg';
import forwardIcon from '../assets/SkipIcon.svg';
import playIcon from '../assets/PlayButton.svg';
import speedIcon from '../assets/PlaySpeed.svg';
import shuffleIcon from '../assets/ShuffleIcon.svg';



const PlayControls = () => {
  return (
    <div className="flex justify-between gap-4 mt-4">
      <button className="p-2 hover:bg-gray-100 rounded">
        <img src={speedIcon} alt="Speed" className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <img src={backIcon} alt="Back" className="w-6 h-6" />
      </button>
      <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
        <img src={playIcon} alt="Play" className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <img src={forwardIcon} alt="Forward" className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <img src={shuffleIcon} alt="Shuffle" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PlayControls;
