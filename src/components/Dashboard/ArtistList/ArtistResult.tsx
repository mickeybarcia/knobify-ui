import React from 'react';

import { Artist } from '../../../types';

type Props = {
  artist: Artist;
  onAddArtist?: (artist: Artist) => void;
  onRemoveArtist?: (artist: Artist) => void;
};

const ArtistResult: React.FC<Props> = ({ artist, onAddArtist, onRemoveArtist }) => {
  const { name } = artist;

  const handleAddArtist = async () => {
    if (onAddArtist) onAddArtist(artist);
  };

  const handleRemoveArtist = async () => {
    if (onRemoveArtist) onRemoveArtist(artist);
  };

  return (
    <div className="d-flex flex-direction-row justify-content-center align-items-center">
      <div className="col-md-10 card card-container m-1 p-1">{name}</div>
      {onAddArtist && <a onClick={handleAddArtist}>+</a>}
      {onRemoveArtist && <a onClick={handleRemoveArtist}>-</a>}
    </div>
  );
};

export default ArtistResult;
