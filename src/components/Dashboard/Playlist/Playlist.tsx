import React from 'react';
import { Track } from '../../../types';
import PlaylistResult from './PlaylistResult';

type Props = {
  trackResults: Track[];
  currentlyPlaying: Track | null;
  onPlayTrack: (track: Track) => void;
};

const Playlist: React.FC<Props> = ({ trackResults, onPlayTrack, currentlyPlaying }) => {
  return (
    <div className="card card-container">
      <div className="p-3">
        <div>recommendation results</div>
        {trackResults.length === 0 && (
          <small className="text-muted">formulate the perfect playlist</small>
        )}
        {trackResults.map((track) => (
          <div key={track.id}>
            <PlaylistResult
              track={track}
              onPlayTrack={onPlayTrack}
              isCurrentlyPlaying={currentlyPlaying?.id === track.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
