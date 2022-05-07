import React from 'react';

import { Track } from '../../../types';
import TrackResult from './TrackResult';
import TrackSearch from './TrackSearch';

type Props = {
  onAddTrack: (track: Track) => void;
  onRemoveTrack: (track: Track) => void;
  seedTracks: Track[];
};

const TrackList: React.FC<Props> = ({ seedTracks, onAddTrack, onRemoveTrack }) => {
  return (
    <div className="card card-container">
      <div className="p-3">
        <TrackSearch onAddTrack={onAddTrack} />
        <br />
        <div>
          <div>seed tracks</div>
          {seedTracks.map((track) => (
            <div key={track.id}>
              <TrackResult track={track} onRemoveTrack={onRemoveTrack} />
            </div>
          ))}
          {seedTracks.length === 0 && <small className="text-muted">search tracks to add</small>}
        </div>
      </div>
    </div>
  );
};

export default TrackList;
