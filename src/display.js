import { clearCanvas, drawLine } from './draw.js';
import { getGuideNode } from './guideNode.js';
import { getNodes } from './nodes.js';
import { getSelectedNode } from './selectedNode.js';
import { getConnections } from './connections.js';

const displayLoop = () => {
	clearCanvas();	

	const nodes = getNodes();
	for(const n of nodes)
		if(!n.selected)
			n.display();

	const selectedNode = getSelectedNode();
	if(selectedNode)
		selectedNode.display();

	const guideNode = getGuideNode();
	if(guideNode)
		guideNode.display();

	const connections = getConnections();
	for(const c of connections) {
		let left;
		let right;
		if(c[0].x < c[1].x) {
			left = c[0];
			right = c[1];
		}
		else {
			left = c[1];
			right = c[0];
		}
		const hl = left.w/2 + left.h/2;
		const hr = right.w/2 + right.h/2;
		drawLine(left.x+hl, left.y, right.x-hr, right.y);	
	}

}
export default displayLoop;
