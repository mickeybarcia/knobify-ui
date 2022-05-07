import React from 'react';

import { Artist } from '../../../types';
import ArtistResult from './ArtistResult';
import ArtistSearch from './ArtistSearch';

type Props = {
  onAddArtist: (artist: Artist) => void;
  onRemoveArtist: (artist: Artist) => void;
  seedArtists: Artist[];
};

const ArtistList: React.FC<Props> = ({ seedArtists, onAddArtist, onRemoveArtist }) => {
  return (
    <div className="card card-container">
      <div className="p-3">
        <ArtistSearch onAddArtist={onAddArtist} />
        <br />
        <div>
          <div>seed artists</div>
          {seedArtists.map((artist) => (
            <div key={artist.id}>
              <ArtistResult artist={artist} onRemoveArtist={onRemoveArtist} />
            </div>
          ))}
          {seedArtists.length === 0 && <small className="text-muted">search artists to add</small>}
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
