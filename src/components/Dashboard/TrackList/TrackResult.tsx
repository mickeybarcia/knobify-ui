import React from 'react';

import { Track } from '../../../types';

type Props = {
  track: Track;
  onAddTrack?: (track: Track) => void;
  onRemoveTrack?: (track: Track) => void;
};

const TrackResult: React.FC<Props> = ({ track, onAddTrack, onRemoveTrack }) => {
  const { name, artists } = track;

  const handleAddTrack = async () => {
    if (onAddTrack) onAddTrack(track);
  };

  const handleRemoveTrack = async () => {
    if (onRemoveTrack) onRemoveTrack(track);
  };

  return (
    <div className="d-flex flex-direction-row justify-content-center align-items-center">
      <div className="col-md-10 card card-container m-1 p-1">
        <div>{name}</div>
        <small className="text-muted">{artists.map(({ name }) => name).join(', ')}</small>
      </div>
      {onAddTrack && <a onClick={handleAddTrack}>+</a>}
      {onRemoveTrack && <a onClick={handleRemoveTrack}>-</a>}
    </div>
  );
};

export default TrackResult;
