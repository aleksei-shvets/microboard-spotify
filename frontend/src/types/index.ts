export interface RatingItem {
  [key: string]: string | number;
}

export interface SongItem {
  Track?: string,
  AlbumName?: string,
  Artist?: string,
  ReleaseDate?: string,
  AllTimeRank?: number,
  TrackScore?: number,
  SpotifyStreams?: number,
  SpotifyPopularity?: number,
  knn?: string[],
  id?: number,
}

export interface TracksInfo {
  [key: number]: SongItem;
}

export interface PointsData {
  labels: number[];
  points: number[][];
  tracksInfo: TracksInfo;
}

export interface KnnResult {
  [key: string]: { knn: { distance: number; label: number }[] };
}

export interface Edge {
  to: number;
}

export interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  edges: Edge[]
}


export interface Nodes {
  [key: string]: Node;
}
