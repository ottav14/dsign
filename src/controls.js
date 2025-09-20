import Node from './Node.js';
import { getMode } from './mode.js';
import { getGuideNode, setGuideNode } from './guideNode.js';
import { getSelectedNode, setSelectedNode } from './selectedNode.js';
import displayLoop from './display.js';
import { createNode, getNodes } from './nodes.js';
import { addConnection } from './connections.js';

let mouseX = 0;
let mouseY = 0;
let mouseHeld = false;

const deselectNode = () => {
	const selectedNode = getSelectedNode();
	if(selectedNode) {
		selectedNode.selected = false;
		setSelectedNode(null);
	}
}

const selectNode = (n) => {
	const selectedNode = getSelectedNode();
	if(selectedNode)
		selectedNode.selected = false;

	n.selected =  true;
	setSelectedNode(n);
}

const connectNodes = (n1, n2) => {
	if(!n1.connections.includes(n2) && n1 !== n2) {
		n1.connections.push(n2);
		n2.connections.push(n1);
		addConnection([n1, n2]);
		console.log('fart');
	}
}

const handleMouseDown = () => {
	mouseHeld = true;
	const mode = getMode();
	const nodes = getNodes();
	switch(mode) {
		case 'node':
			createNode(mouseX, mouseY);
			break;
		case 'move':
			for(const n of nodes) {
				if(n.checkHover(mouseX, mouseY)) {
					selectNode(n);
					break;
				}
			}
			break;
		case 'line':
			for(const n of nodes) {
				if(n.checkHover(mouseX, mouseY)) {
					const selectedNode = getSelectedNode();
					if(selectedNode) {
						connectNodes(selectedNode, n);
						deselectNode();
					}
					else
						selectNode(n);

					displayLoop();
					break;
				}
			}
			break;
	}
}

const handleMouseUp = () => {
	mouseHeld = false;
	const mode = getMode();
	switch(mode) {
		case 'node':
			break;
		case 'move':
			break;
	}
}

const handleMouseMove = (e) => {
	const mode = getMode();
	const guideNode = getGuideNode();
	const selectedNode = getSelectedNode();
	mouseX = e.clientX;
	mouseY = e.clientY;

	switch(mode) {
		case 'node':
			if(!guideNode)
				setGuideNode(new Node(mouseX, mouseY, true));
			else {
				guideNode.x = mouseX;
				guideNode.y = mouseY;
			}
			displayLoop();
			break;
		case 'move':
			if(mouseHeld && selectedNode) {
				selectedNode.x = mouseX;
				selectedNode.y = mouseY;
				displayLoop();
			}
			break;
	}
}

const initControls = () => {
	document.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mouseup', handleMouseUp);
}
export default initControls;
