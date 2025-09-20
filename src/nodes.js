import Node from './Node.js';

const nodes = [];
export const getNodes = () => nodes;
export const createNode = (x, y) => nodes.push(new Node(x, y));
