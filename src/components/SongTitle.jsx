import React from 'react';

const SongTitle = ({ title, author }) => {
  return (
    <div className="mt-2 font-inter font-bold text-[24px] leading-none">
      {title}
      <div className="text-gray-600 font-medium text-sm">
        by {author}
      </div>
    </div>
  );
};

export default SongTitle;
