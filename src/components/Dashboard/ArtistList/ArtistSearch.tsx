import React, { useEffect, useState } from 'react';

import { Artist } from '../../../types';
import KnobifyApi from '../../../services/knobify-api';
import ArtistResult from './ArtistResult';

type Props = {
  onAddArtist: (artist: Artist) => void;
};

const ArtistSearch: React.FC<Props> = ({ onAddArtist }) => {
  const [query, setQuery] = useState<string>('');
  const [artistResults, setArtistResults] = useState<Artist[]>([]);

  const searchArtist = async () => {
    const {
      data: { artists }
    } = await KnobifyApi.searchArtists(query);
    setArtistResults(artists);
  };

  useEffect(() => {
    if (query === '') {
      setArtistResults([]);
    } else {
      searchArtist();
    }
  }, [query]);

  return (
    <div>
      <div className="form-group m-1">
        <label htmlFor="query">search artists to add</label>
        <input
          className="form-control"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}></input>
      </div>
      <div>
        {artistResults.map((artist) => (
          <div key={artist.id}>
            <ArtistResult artist={artist} onAddArtist={onAddArtist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
