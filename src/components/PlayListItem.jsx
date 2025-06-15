const PlayListItem = ({ title, artist, length }) => (
  <div className="p-2 border-b" style={{ width: '400px' }}>
    <div className="flex justify-between">
      <div className="font-medium text-base leading-none tracking-normal font-inter">{title}</div>
      <div className="text-sm text-gray-600">{length}</div>
    </div>
    <div className="text-sm text-gray-500">{artist}</div>
  </div>
);

export default PlayListItem;

