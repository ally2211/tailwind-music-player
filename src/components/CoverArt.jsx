import React from 'react';
import placeholder from '../assets/placeholder.svg';

const CoverArt = ({ coverImage, title }) => (
  <div style={{ width: '400px', height: '400px' }}>
    <img
      src={coverImage || placeholder}
      alt={title ? `Cover Art for ${title}` : "Cover Art"}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
);

export default CoverArt;

