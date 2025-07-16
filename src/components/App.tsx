import React from 'react';
import MusicPlayer from './MusicPlayer';
import Footer from './Footer';

function App() {
  return (
    <div className="p-8 bg-white bg-white text-black dark:bg-darkBlue dark:text-warmWhite">
      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;
