/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */

import { PointsData, KnnResult, Nodes, Node} from '../types/index';

interface WorkerMessageData {
  pointsData: PointsData;
  knnCount: number;
}


function areNodesOverlapping(x1: number, y1: number, x2: number, y2: number, radius: number): boolean {
  const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return distance < 2 * radius;
}

function getKnn(pointsData: PointsData, knnCount: number = 5): { nodes: Nodes } {
  const centerX: number = 600;
  const centerY: number = 400;
  let radius: number = 200;
  let angle = 0;
  let angleStep;
  const pi: number = 3.14;
  let circleLength = pi * 2 * radius;
  let swingCount: number = 1;

  const nodes: Nodes = {};

  const treeWithKnn: KnnResult = {};
  const { labels, points, tracksInfo } = pointsData;

  for (let i = 0; i < labels.length; i += 1) {
    angleStep = Math.round(circleLength / 250);

    let xCoordinate = Math.round(centerX + radius * Math.cos(angle));
    let yCoordinate = Math.round(centerY + radius * Math.sin(angle));

    let isOverlapping = Object.values(nodes).some(node => areNodesOverlapping(node.x, node.y, xCoordinate, yCoordinate, 30));

    while (isOverlapping) {
      angle += angleStep;
      if (angle > 359) {
        radius += 300;
        angle -= (360 * swingCount);
        swingCount += 1;
      }
      xCoordinate = Math.round(centerX + radius * Math.cos(angle));
      yCoordinate = Math.round(centerY + radius * Math.sin(angle));
      isOverlapping = Object.values(nodes).some(node => areNodesOverlapping(node.x, node.y, xCoordinate, yCoordinate, 30));
    }

    if (angle > 359) {
      radius += 100;
      angle -= (360 * swingCount);
      swingCount += 1;
    } else {
      angle += angleStep;
    }

    const currentLabel = labels[i];
    const currentPoint = points[i];
    const id = labels[i];

    const node: Node = {
      id,
      label: tracksInfo[id].Track || 'Unknown Track',
      x: xCoordinate,
      y: yCoordinate,
      edges: [],
    }

    nodes[currentLabel] = node;

    if (!treeWithKnn[currentLabel]) {
      treeWithKnn[currentLabel] = { knn: [] };
    }

    const distances = points
      .map((point, index) => {
        if (index === i) return null;
        return {
          distance: Math.sqrt(
            point.reduce((sum, coord, j) => sum + Math.pow(coord - currentPoint[j], 2), 0)
          ),
          label: labels[index],
        };
      })
      .filter((item): item is { distance: number; label: number } => item !== null);

    const sortedKnn = distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, knnCount);


    sortedKnn.forEach((item) => {
      nodes[currentLabel].edges.push({
        to: item.label,
      })
    });

    treeWithKnn[currentLabel].knn = treeWithKnn[currentLabel].knn
      .sort((a, b) => a.distance - b.distance)
      .slice(0, knnCount);
  }

  return { nodes };
}

self.onmessage = function (event: MessageEvent<WorkerMessageData>) {
  const { pointsData, knnCount } = event.data;

  const knnTree = getKnn(pointsData, knnCount);

  self.postMessage(knnTree);
};
