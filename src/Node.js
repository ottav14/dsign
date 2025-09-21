import { drawLine } from './draw.js';
import { getSelectedNode, setSelectedNode } from './selectedNode.js';
import { showNodeInfo, hideNodeInfo } from './nodeInfoDisplay.js';
import { getMode } from './mode.js';
import { addConnection } from './connections.js';

const ctx = document.getElementById('canvas').getContext('2d');

export const deselectNode = () => {
	const selectedNode = getSelectedNode();
	if(selectedNode) {
		selectedNode.selected = false;
		setSelectedNode(null);
	}
	hideNodeInfo();
}

export const selectNode = (n) => {
	const selectedNode = getSelectedNode();
	if(selectedNode)
		selectedNode.selected = false;

	n.selected =  true;
	setSelectedNode(n);

	const mode = getMode();
	if(mode === 'move')
		showNodeInfo();
}

export const connectNodes = (n1, n2) => {
	if(!n1.connections.includes(n2) && n1 !== n2) {
		n1.connections.push(n2);
		n2.connections.push(n1);
		addConnection([n1, n2]);
	}
}

class Node {
	constructor(x, y, guide=false) {
		this.x = x;
		this.y = y;
		this.w = 100;
		this.h = 100;
		this.guide = guide;
		this.selected = false;
		this.connections = [];
		this.text = '';
		this.col = '#00f';
	}

	display() {
		const hw = this.w/2;
		const hh = this.h/2;

		// Styling
		ctx.fillStyle = this.guide ? 'rgba(77, 77, 77, 0.7)' : this.col;

		// Middle
		ctx.fillRect(this.x-hw, this.y-hh, this.w, this.h);

		// Left arc
		ctx.beginPath();
		ctx.arc(this.x-hw, this.y, hh, Math.PI/2, 3*Math.PI/2);

		// Right arc
		ctx.moveTo(this.x+hw, this.y-hh);
		ctx.arc(this.x+hw, this.y, hh, -Math.PI/2, Math.PI/2);

		// Fill
		ctx.fill();

		// Text
		ctx.font = '30px Arial';
		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillText(this.text, this.x, this.y);

		// Selected
		ctx.lineWidth = this.selected ? 6 : 3;

		// Stroke
		ctx.stroke();

		drawLine(this.x-hw, this.y-hh, this.x+hw, this.y-hh);
		drawLine(this.x-hw, this.y+hh, this.x+hw, this.y+hh);

	}

	checkHover(mx, my) {
		const hw = this.w/2;
		const hh = this.h/2;
		return mx >= this.x-hw-hh && mx < this.x+hw+hh &&
			   my >= this.y-hh    && my < this.y+hh;
	}
}
export default Node;
