import { SongItem, TracksInfo } from "../types";

const getPoints = (elements: SongItem[]) => {
  const labels: number[] = [];
  const points: number[][] = [];
  const tracksInfo: TracksInfo = {};

  for (let i = 0; i < elements.length; i += 1) {
    const a: number = Number(elements[i].SpotifyStreams);
    const b: number = Number(elements[i].SpotifyPopularity);
    const c: number = Number(elements[i].TrackScore);
    const point = [a, b, c];
    points.push(point);
    labels.push(i);

    const song = { ...elements[i], id: i};
    tracksInfo[i] = song;
  }

  return { labels, points, tracksInfo };
}

export default getPoints;
