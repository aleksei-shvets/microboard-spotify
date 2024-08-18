import MapComponent from "../components/MapComponent";
import SongList from "../components/SongList";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, getSongsSelector } from '../store/knnSlise';
import { AppDispatch, RootState } from '../store/index';
import { useEffect, useMemo, useState } from "react";
import { PointsData, Nodes, Edge } from '../types/index';
import getPoints from '../lib/getPoints';

interface Res {
  nodes: Nodes;
  edges: Edge[];
}

const HomeContainer = () => {
  const [points, setPoints] = useState<PointsData | null>(null);
  const [nodes, setNodes] = useState<Nodes>({});

  const dispatch = useDispatch<AppDispatch>();

  const dataSet = useSelector((state: RootState) => getSongsSelector(state));

  const memoizedPoints = useMemo(() => dataSet.length > 0 ? getPoints(dataSet) : null, [dataSet]);

  useEffect(() => {
    setPoints(memoizedPoints);
  }, [memoizedPoints]);

  useEffect(() => {
    if (points) {
      const knnWorker = new Worker(new URL('../workers/knnWorker.ts', import.meta.url), { type: 'module' });

      knnWorker.postMessage({ pointsData: points, knnCount: 10 });

      knnWorker.onmessage = (event: MessageEvent<Res>) => {
        const { nodes } = event.data;
        setNodes(nodes);
        console.log(nodes)
        knnWorker.terminate();
      };

      knnWorker.onerror = (error) => {
        console.error('Worker error:', error);
        knnWorker.terminate();
      };
    }
  }, [dispatch, points]);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div className="home-container">
      <SongList points={points} />
      <MapComponent nodes={nodes} />
    </div>
    
  )
};

export default HomeContainer;
