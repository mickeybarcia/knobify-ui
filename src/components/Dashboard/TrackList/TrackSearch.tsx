import React, { useEffect, useState } from 'react';

import { Track } from '../../../types';
import KnobifyApi from '../../../services/knobify-api';
import TrackResult from './TrackResult';

type Props = {
  onAddTrack: (track: Track) => void;
};

const ArtistSearch: React.FC<Props> = ({ onAddTrack }) => {
  const [query, setQuery] = useState<string>('');
  const [trackResults, setTrackResults] = useState<Track[]>([]);

  const searchTrack = async () => {
    const {
      data: { tracks }
    } = await KnobifyApi.searchTracks(query);
    setTrackResults(tracks);
  };

  useEffect(() => {
    if (query === '') {
      setTrackResults([]);
    } else {
      searchTrack();
    }
  }, [query]);

  return (
    <div>
      <div className="form-group m-1">
        <label htmlFor="query">search tracks to add</label>
        <input
          className="form-control"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}></input>
      </div>
      <div>
        {trackResults.map((track) => (
          <div key={track.id}>
            <TrackResult track={track} onAddTrack={onAddTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
