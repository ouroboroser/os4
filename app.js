const dijkstra = require('./dijkstra');

const graph = require('./graph');
const negativeGraph = require('./negativeGraph');

const findWay = dijkstra(graph);
let findMaxWay = dijkstra(negativeGraph);

console.log('Result for positive graph: ', findWay);
console.log('Result for negative graph: ', findMaxWay);

const vertexs = findMaxWay.path;

findMaxWay = findMaxWay.distance * -1;

console.log('Result for negative graph: ', findMaxWay);

const result = {
  vertexs: vertexs,
  way: findMaxWay,
};

console.log('Final result: ', result);