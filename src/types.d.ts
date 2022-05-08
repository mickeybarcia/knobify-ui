export type RecommendationsQuery = RecommendationsQuerySettings & {
  seed_artists?: string[];
  seed_tracks?: string[];
};

export type RecommendationsQuerySettings = {
  // -- 0-1 -- //
  min_energy?: number;
  max_energy?: number;

  max_acousticness?: number;
  min_acousticness?: number;

  max_danceability?: number;
  min_danceability?: number;

  max_instrumentalness?: number;
  min_instrumentalness?: number;

  max_valence?: number;
  min_valence?: number;

  // -- 0-100 --//
  max_popularity?: number;
  min_popularity?: number;

  // added fields
  excludeRecent?: boolean;
  excludeLiked?: boolean;
};

export type Artist = {
  id: string;
  name: string;
  playUri: string;
  appUrl: string;
};

export type Track = {
  artists: Artist[];
  id: string;
  name: string;
  playUri: string;
  picUrl: string;
  appUrl: string;
  isPlayable: boolean;
};

export type RecommendationsResponse = {
  tracks: Track[];
};
