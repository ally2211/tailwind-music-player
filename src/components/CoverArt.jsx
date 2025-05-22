import React from 'react';
import placeholder from '../assets/placeholder.svg';

const CoverArt = () => {
  return (
    <div className="w-[400px] h-auto">
      <img src={placeholder} alt="Cover Art" className="w-full h-auto object-cover" />
    </div>
  );
};

export default CoverArt;
