import React, { useEffect, useRef, useState } from 'react';

import KnobifyApi from '../../services/knobify-api';
import { ErrorBanner, Spinner } from '../Common';
import { Artist, RecommendationsQuerySettings, Track } from '../../types';
import RecommendationsSettings from './RecommendationsSettings';
import ArtistList from './ArtistList';
import Playlist from './Playlist';
import TrackList from './TrackList';

const NO_RESULTS_MESSAGE = 'no results found.. try adding more seed artists or tracks';
const RECOMMENDATIONS_ERROR =
  'error loading recommendations.. you must select at least one seed artist or track';
const SEED_COUNT_ERROR = 'you must choose between 1 and 5 seed artists and tracks in total';
const PLAY_TRACK_ERROR =
  'unable to play track.. make sure you have an active device playing spotify';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [seedArtists, setSeedArtists] = useState<Artist[]>([]);
  const [seedTracks, setSeedTracks] = useState<Track[]>([]);
  const [recommendationsSettings, setRecommendationsSettings] =
    useState<RecommendationsQuerySettings>({});
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const didMount = useRef(false);

  const loadRecommendations = async () => {
    try {
      setMessage('');
      setCurrentlyPlaying(null);
      setTrackResults([]);
      const seedLen = seedTracks.length + seedArtists.length;
      if (seedLen === 0 || seedLen > 5) {
        setMessage(SEED_COUNT_ERROR);
        return;
      }
      setLoading(true);
      const {
        data: { tracks }
      } = await KnobifyApi.getRecommendations({
        ...recommendationsSettings,
        seed_artists: seedArtists.map(({ id }) => id),
        seed_tracks: seedTracks.map(({ id }) => id)
      });
      setLoading(false);
      setTrackResults(tracks);
      if (tracks.length === 0) setMessage(NO_RESULTS_MESSAGE);
    } catch (err) {
      setLoading(false);
      setMessage(RECOMMENDATIONS_ERROR);
    }
  };

  useEffect(() => {
    if (didMount.current) {
      // don't run for each dep on initialization
      loadRecommendations();
    } else {
      didMount.current = true;
    }
  }, [seedArtists, recommendationsSettings, seedTracks]);

  const handleChangeSettings = async (newSettings: RecommendationsQuerySettings) => {
    if (newSettings !== recommendationsSettings) setRecommendationsSettings(newSettings);
  };

  const handleAddArtist = async (artist: Artist) => {
    if (!seedArtists.includes(artist)) {
      const newArtists = [artist, ...seedArtists];
      setSeedArtists(newArtists);
    }
  };

  const handleRemoveArtist = async (artist: Artist) => {
    const index = seedArtists.indexOf(artist);
    seedArtists.splice(index, 1);
    const newArtists = [...seedArtists];
    setSeedArtists(newArtists);
  };

  const handleAddTrack = async (track: Track) => {
    if (!seedTracks.includes(track)) {
      const newTracks = [track, ...seedTracks];
      setSeedTracks(newTracks);
    }
  };

  const handleRemoveTrack = async (track: Track) => {
    const index = seedTracks.indexOf(track);
    seedTracks.splice(index, 1);
    const newTracks = [...seedTracks];
    setSeedTracks(newTracks);
  };

  const handlePlayTrack = async (track: Track) => {
    try {
      setCurrentlyPlaying(track);
      const uris = trackResults.map(({ playUri }) => playUri);
      const index = uris.indexOf(track.playUri);
      const playUris = uris.splice(index, trackResults.length).concat(uris.splice(0, index));
      await KnobifyApi.playTracks(playUris);
      setMessage('');
    } catch (error) {
      setCurrentlyPlaying(null);
      setMessage(PLAY_TRACK_ERROR);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <RecommendationsSettings
            onChangeSettings={handleChangeSettings}
            settings={recommendationsSettings}
          />
          <br />
        </div>

        <div className="col-md-3">
          <ArtistList
            onAddArtist={handleAddArtist}
            onRemoveArtist={handleRemoveArtist}
            seedArtists={seedArtists}
          />
          <br />
          <TrackList
            onAddTrack={handleAddTrack}
            onRemoveTrack={handleRemoveTrack}
            seedTracks={seedTracks}
          />
          <br />
        </div>

        <div className="col-md-4">
          <Spinner isLoading={loading} />
          <ErrorBanner message={message} />
          {!loading && (
            <Playlist
              trackResults={trackResults}
              onPlayTrack={handlePlayTrack}
              currentlyPlaying={currentlyPlaying}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
