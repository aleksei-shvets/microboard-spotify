import { FC } from 'react';
import { SongItem } from '../types/index'
import { setSelectedSong, getSelectedSongSelector } from '../store/knnSlise'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import clsx from 'clsx';


interface ListItemProps {
  item: SongItem;
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch()

  const selectedSong = useSelector((state: RootState) => getSelectedSongSelector(state))

  const classes = clsx('list-item', selectedSong === item.id ? 'active-item' : null)

  const handleClick = (id: number) => {
    if (id !== undefined && id !== null) {
      dispatch(setSelectedSong(id))
    }
  }

  return (
    <li id={String(item.id)} className={classes} onClick={() => handleClick(Number(item.id))}>
      <p className="track-name">
        {item.Track}
      </p>
      <p className="artist-name">
        {item.Artist}
      </p>
    </li>
  );
};

export default ListItem;
