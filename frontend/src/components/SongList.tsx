import { FC, useEffect, useState } from 'react';
import ListItem from './ListItem';
import { PointsData, SongItem } from '../types';

interface SongListProps {
  points: PointsData | null;
}

const SongList: FC<SongListProps> = ({ points }) => {
  const [songs, setSongs] = useState<SongItem[]>([]);

  useEffect(() => {
    if (points) {
      const { tracksInfo } = points;
      const songList = Object.values(tracksInfo);
      setSongs(songList);
    }
  }, [points]);

  return (
    <div className="song-list-container">
      <ul>
        {songs.map((item: SongItem) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default SongList;
