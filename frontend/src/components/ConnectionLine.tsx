import React, { FC, useEffect, useState } from 'react';
import { Line, Layer } from 'react-konva';
import { Nodes, Edge } from '../types';
import { useSelector } from 'react-redux';
import { getSelectedSongSelector } from '../store/knnSlise';

interface LineProps {
  propNodes: Nodes;
}

const ConnectionLine: FC<LineProps> = ({ propNodes }) => {
  const currentLabel = useSelector(getSelectedSongSelector);
  const [edges, setEdges] = useState<Edge[] | null>(null);
  const [lineLayer, setLineLayer] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    console.log('Current Label:', currentLabel);
    console.log('Prop Nodes:', propNodes);

    if (currentLabel !== undefined && propNodes[currentLabel]) {
      const lines = propNodes[currentLabel]?.edges || [];
      setEdges(lines);
    } else {
      setEdges(null);
    }
  }, [currentLabel, propNodes]);

  useEffect(() => {
    const genLines = () => {
      if (edges && currentLabel !== undefined && propNodes[currentLabel]) {
        const lineComponents = edges.map((edge: Edge, index: number) => {
          const fromNode = propNodes[currentLabel];
          const toNode = propNodes[edge.to];

          if (!fromNode || !toNode) {
            console.warn('Invalid nodes:', fromNode, toNode);
            return null;
          }

          return (
            <Line
              key={index}
              points={[fromNode.x, fromNode.y, toNode.x, toNode.y]}
              stroke="#EEFF00"
              strokeWidth={1}
            />
          );
        });

        setLineLayer(<Layer>{lineComponents}</Layer>);
      } else {
        setLineLayer(null);
      }
    };

    genLines();
  }, [propNodes, currentLabel, edges]);

  return <>{lineLayer}</>;
};

export default ConnectionLine;
