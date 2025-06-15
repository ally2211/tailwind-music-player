const PlayListItem = ({ title, artist, length }) => (
  <div className="p-2 border-b">
    <div className="flex justify-between">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-600">{length}</div>
    </div>
    <div className="text-sm text-gray-500">{artist}</div>
  </div>
);

export default PlayListItem;

