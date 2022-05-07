import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RecommendationsQuery, RecommendationsResponse } from '../types';
import Config from '../config';

const baseURL = Config.apiBaseUrl;
const headers = { 'Content-Type': 'application/json' };
const instance = axios.create({ baseURL, headers });

const TOKEN_SESSION_KEY = 'TOKEN';
const LOGIN_REDIRECT_PATH = '/login?error=true';
const AUTH_PATH = '/auth';
const REFRESH_PATH = AUTH_PATH + '/refreshToken';
const SPOTIFY_PATH = '/spotify';

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_SESSION_KEY);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const { config: originalConfig } = err;
    if (originalConfig.url !== REFRESH_PATH && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const {
            data: { token }
          } = await refreshToken();
          localStorage.setItem(TOKEN_SESSION_KEY, token);
          return instance(originalConfig);
        } catch (_err) {
          localStorage.removeItem(TOKEN_SESSION_KEY);
          window.location.href = LOGIN_REDIRECT_PATH;
        }
      } else if (err.response.status === 401) {
        window.location.href = LOGIN_REDIRECT_PATH;
      }
    }
    return Promise.reject(err);
  }
);

const refreshToken = async (): Promise<AxiosResponse<{ token: string }>> => {
  return instance.get(REFRESH_PATH, { withCredentials: true });
};

const getRecommendations = async (
  recommendations: RecommendationsQuery
): Promise<AxiosResponse<RecommendationsResponse>> => {
  return instance.post(SPOTIFY_PATH + '/recommendations', recommendations);
};

const searchArtists = async (query: string) => {
  return instance.get(SPOTIFY_PATH + '/searchArtists', { params: { query } });
};

const searchTracks = async (query: string) => {
  return instance.get(SPOTIFY_PATH + '/searchTracks', { params: { query } });
};

const playTracks = async (uris: string[]) => {
  return instance.get(SPOTIFY_PATH + '/playTracks', { params: { uris: uris.join(',') } });
};

const KnobifyApi = {
  refreshToken,
  getRecommendations,
  searchArtists,
  searchTracks,
  playTracks
};

export default KnobifyApi;
