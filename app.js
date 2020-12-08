const graph = {
  start: { A: 7, A1: 2, A2: 7 },
  A: { A4: 3, A5: 7 },
  A1: { A5: 3, A6: 7 },
  A2: { A3: 3, A6: 1, A7: 4 },
  A4: { A5: 6, A8: 1, A9: 1 },
  A5: { A10: 3 },
  A6: { A10: 1 },
  A7: { A11: 2 },
  A8: { A12: 7, A13: 1 },
  A9: { A13: 2 },
  A10: { A14: 4, A15: 2 },
  A11: { A15: 3 },
  A12: { A13: 7, A16: 6, A17: 7 },
  A13: { A14: 4, A17: 2, A18: 6 },
  A14: { A18: 2 },
  A15: { A18: 1, A19: 1 },
  A16: { A20: 2 },
  A17: { A20: 7, A21: 4 },
  A18: { A21: 6, A22: 6, A26: 4 },
  A19: { A23: 7 },
  A20: { A24: 6 },
  A21: { A24: 2, A25: 3 },
  A22: { A25: 2 },
  A23: { A26: 2, A27: 4 },
  A24: { A28: 4, finish: 6 },
  A25: { A29: 3 },
  A26: { finish: 7 },
  A27: { finish: 6 },
  A28: { finish: 7 },
  A29: { finish: 7 },
  finish: {},
};

const findLowestCostNode = (costs, processed) => {
  const knownNodes = Object.keys(costs);

  const lowestCostNode = knownNodes.reduce((lowest, node) => {
    if (lowest === null && !processed.includes(node)) {
      lowest = node;
    }
    if (costs[node] < costs[lowest] && !processed.includes(node)) {
      lowest = node;
    }
    return lowest;
  }, null);

  return lowestCostNode;
};

const dijkstra = (graph) => {
  console.log('Graph: ');
  console.log(graph);

  const trackedCosts = Object.assign({ finish: Infinity }, graph.start);
  console.log('Initial `costs`: ');
  console.log(trackedCosts);

  const trackedParents = { finish: null };
  for (let child in graph.start) {
    trackedParents[child] = 'start';
  }
  console.log('Initial `parents`: ');
  console.log(trackedParents);

  const processedNodes = [];

  let node = findLowestCostNode(trackedCosts, processedNodes);
  console.log('Initial `node`: ', node);

  console.log('while loop starts: ');
  while (node) {
    console.log(`***** 'currentNode': ${node} *****`);
    let costToReachNode = trackedCosts[node];
    let childrenOfNode = graph[node];

    for (let child in childrenOfNode) {
      let costFromNodetoChild = childrenOfNode[child];
      let costToChild = costToReachNode + costFromNodetoChild;

      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild;
        trackedParents[child] = node;
      }

      console.log('`trackedCosts`', trackedCosts);
      console.log('`trackedParents`', trackedParents);
      console.log('----------------');
    }

    processedNodes.push(node);

    node = findLowestCostNode(trackedCosts, processedNodes);
  }
  console.log('while loop ends: ');

  let optimalPath = ['finish'];
  let parent = trackedParents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = trackedParents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: trackedCosts.finish,
    path: optimalPath,
  };

  return results;
};

console.log('dijkstra', dijkstra(graph));
