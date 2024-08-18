import { FC } from 'react';
import Konva from 'konva';
import { Layer, Circle, Text, Group } from 'react-konva';
import { Nodes } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedSongSelector, setSelectedSong } from '../store/knnSlise';

interface VinylRecordProps {
  propNodes: Nodes;
}

const VinylRecord: FC<VinylRecordProps> = ({ propNodes }) => {
  const dispatch = useDispatch();
  const selectedSong = useSelector(getSelectedSongSelector);

  const handler = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const target = e.currentTarget as Konva.Group;
    const id = target.attrs.id;

    if (id !== undefined && id !== null) {
      dispatch(setSelectedSong(Number(id)));
    }
  };

  const points = Object.values(propNodes).map(({ id, label, x, y }) => {
    const nodeColor = selectedSong === id ? '#EEFF00' : '#211529';
    return (
      <Group
        key={id}
        id={String(id)}
        x={x}
        y={y}
        onClick={handler}
        draggable
      >
        <Circle
          x={0}
          y={0}
          radius={20}
          fill={nodeColor}
        />
        <Circle
          x={0}
          y={0}
          radius={17}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
          
        />
        <Circle
          x={0}
          y={0}
          radius={15}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
        />
        <Circle
          x={0}
          y={0}
          radius={13}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
        />
        <Circle
          x={0}
          y={0}
          radius={11}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
        />
        <Circle
          x={0}
          y={0}
          radius={9}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
        />
        <Circle
          x={0}
          y={0}
          radius={7}
          fill={nodeColor}
          stroke="#817c7c"
          strokeWidth={1}
        />
        <Text
          x={-10}
          y={-10}
          text={label || ''}
          fontSize={18}
          fill="#fff"
          fontWeight='bold'
        />
      </Group>
    );
  });

  return (
    <Layer>
      {points}
    </Layer>
  );
};

export default VinylRecord;
