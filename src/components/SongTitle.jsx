const SongTitle = ({ title, author }) => (
  <h2 style={{ width: '400px' }}>
    <div className="font-medium text-base leading-none tracking-normal font-inter">{title}</div>
    <div className="text-sm text-gray-600">{author}</div>
  </h2>
);

export default SongTitle;
