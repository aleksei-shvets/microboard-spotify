import { FC, useEffect, useState, useRef, useLayoutEffect } from 'react';
import VinilItem from "./VinilItem";
import ConnectionLine from "./ConnectionLine";
import { Stage } from 'react-konva';
import Konva from 'konva';
import { Nodes } from '../types';

interface MapComponentProps {
  nodes: Nodes;
}

const MapComponent: FC<MapComponentProps> = ({ nodes }) => {
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [scale, setScale] = useState(1);

  const stageRef = useRef<HTMLDivElement>(null);

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const refEl = stageRef.current;
    if (refEl) {
      const { width, height } = refEl.getBoundingClientRect();
      setStageWidth(width);
      setStageHeight(height);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.2;
    const newScale = e.evt.deltaY < 0 ? scale * scaleBy : scale / scaleBy;
    setScale(newScale);
  };

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setDragStart({ x: e.evt.clientX - dragOffset.x, y: e.evt.clientY - dragOffset.y });
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (dragStart) {
      setDragOffset({ x: e.evt.clientX - dragStart.x, y: e.evt.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  return (
    <div ref={stageRef} className="map-container">
      <Stage
        width={stageWidth}
        height={stageHeight}
        scaleX={scale}
        scaleY={scale}
        x={dragOffset.x}
        y={dragOffset.y}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <ConnectionLine propNodes={nodes} />
        <VinilItem propNodes={nodes} />
      </Stage>
    </div>
  );
};

export default MapComponent;
