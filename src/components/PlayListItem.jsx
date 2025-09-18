import React from 'react';
import placeholder from '../assets/placeholder.svg';


const PlayListItem = ({ title, artist, length, loading = false, onClick, isActive = false }) => {
  if (loading) {
    return (
      <div className={`p-2 border-b w-full max-w-[400px] animate-pulse`}>
        <div className="flex justify-between mb-1">
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div
      className={`border border-warmYellow rounded-lg p-3 transition duration-200 cursor-pointer
               hover:bg-warmYellow hover:text-darkBlue ${isActive ? 'bg-warmYellow text-darkBlue' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="font-inter font-medium text-base leading-none tracking-normal">
          {title}
        </div>
        <div className="text-sm opacity-70">{length}</div>
      </div>
      <div className="text-sm opacity-60">{artist}</div>
    </div>
  )
}

export default PlayListItem;
