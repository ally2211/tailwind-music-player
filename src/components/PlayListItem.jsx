const PlayListItem = ({ title, artist, length }) => (
  <div
    className="border border-warmYellow rounded-lg p-3 transition duration-200
               hover:bg-warmYellow hover:text-darkBlue cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <div className="font-inter font-medium text-base leading-none tracking-normal">
        {title}
      </div>
      <div className="text-sm opacity-70">{length}</div>
    </div>
    <div className="text-sm opacity-60">{artist}</div>
  </div>
);

export default PlayListItem;
