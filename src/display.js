import { clearCanvas, drawLine, drawCurve } from './draw.js';
import { getGuideNode } from './guideNode.js';
import { getNodes } from './nodes.js';
import { getSelectedNode } from './selectedNode.js';
import { getConnections } from './connections.js';

const drawConnections = () => {
	const connections = getConnections();
	document.getElementById('canvas').getContext('2d').lineWidth = 3;
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

		const p0 = { x: left.x+hl,  y: left.y };
		const p3 = { x: right.x-hr, y: right.y };

		const dp = { x: p3.x-p0.x, y: p3.y-p0.y };
		const mag = Math.sqrt(dp.x*dp.x + dp.y*dp.y);
		dp.x /= mag;
		dp.y /= mag;

		const p1 = { x: p0.x + 100, y: p0.y };
		const p2 = { x: p3.x - 100, y: p3.y };

		drawCurve(p0, p1, p2, p3);
	}

}

const displayLoop = () => {
	clearCanvas();	

	drawConnections();

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

}
export default displayLoop;
