const SongTitle = ({ title, author }) => (
  <div style={{ width: '400px' }}>
    <div className="font-bold text-lg">{title}</div>
    <div className="text-sm text-gray-600">{author}</div>
  </div>
);

export default SongTitle;
