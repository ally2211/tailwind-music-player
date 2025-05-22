import React from 'react';

const PlayListItem = ({ title, artist, length }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-2 border-b">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500">{artist}</div>
      </div>
      <div className="text-sm text-gray-600 mt-1 md:mt-0">{length}</div>
    </div>
  );
};

export default PlayListItem;
