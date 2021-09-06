import React from 'react';

export default React.createContext({
  isPlaying: false,
  togglePlay: (value) => {},
  onAirChannel: "",
  setOnAirChannel: (value) => {}
});
