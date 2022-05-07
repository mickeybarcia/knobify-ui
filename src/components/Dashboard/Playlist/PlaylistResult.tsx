import React from 'react';
import { Track } from '../../../types';

type Props = {
  track: Track;
  onPlayTrack: (track: Track) => void;
  isCurrentlyPlaying: boolean;
};

const PlaylistResult: React.FC<Props> = ({ track, onPlayTrack, isCurrentlyPlaying }) => {
  const handlePlayTrack = () => onPlayTrack(track);
  const { artists, picUrl, name } = track;
  return (
    <div
      className={'card card-container m-2 p-1 ' + (isCurrentlyPlaying ? 'border-dark' : '')}
      onClick={handlePlayTrack}>
      <div className="d-flex flex-direction-row align-items-center">
        <img className="p-2" style={{ height: '70px', width: '70px' }} src={picUrl}></img>
        <div className="d-flex flex-column align-items-start p-1">
          <div className="text-start">{name}</div>
          <small className="text-muted text-start">
            {artists.map(({ name }) => name).join(', ')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PlaylistResult;
