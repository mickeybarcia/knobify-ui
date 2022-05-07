export type RecommendationsQuery = RecommendationsQuerySettings & {
  seed_artists?: string[];
  seed_tracks?: string[];
};

export type RecommendationsQuerySettings = {
  limit?: number; // 1-100

  // -- 0-1 -- //
  min_energy?: number;
  max_energy?: number;

  max_acousticness?: number;
  min_acousticness?: number;

  max_danceability?: number;
  min_danceability?: number;

  max_instrumentalness?: number;
  min_instrumentalness?: number;

  // added fields
  excludeDays?: number;
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
