import Node from './Node.js';
import { selectNode, deselectNode, connectNodes } from './Node.js';
import { getMode } from './mode.js';
import { getGuideNode, setGuideNode } from './guideNode.js';
import { getSelectedNode, setSelectedNode } from './selectedNode.js';
import displayLoop from './display.js';
import { createNode, getNodes } from './nodes.js';
import { addConnection } from './connections.js';
import { showNodeInfo, hideNodeInfo } from './nodeInfoDisplay.js';;

let mouseX = 0;
let mouseY = 0;
let mouseDX = 0;
let mouseDY = 0;
let mouseHeld = false;

const hue = (h) => {
	h = h % 360;
	let x = 1 - Math.abs((h/60) % 2 - 1);

	let r1, g1, b1;
	if(h<60)       [r1,g1,b1] = [1,x,0];
	else if(h<120) [r1,g1,b1] = [x,1,0];
	else if(h<180) [r1,g1,b1] = [0,1,x];
	else if(h<240) [r1,g1,b1] = [0,x,1];
	else if(h<300) [r1,g1,b1] = [x,0,1];
	else           [r1,g1,b1] = [1,0,x];

	const r = Math.round(255*r1);
	const g = Math.round(255*g1);
	const b = Math.round(255*b1);

	return [ r, g, b ];
}

const handleNodeTextInput = (e) => {
	const selectedNode = getSelectedNode();
	selectedNode.text = e.target.value;
	displayLoop();
}
const nodeTextInput = document.getElementById('nodeTextInput');
nodeTextInput.addEventListener('input', handleNodeTextInput);
nodeTextInput.value = '';

const handleNodeColorInput = (e) => {
	const selectedNode = getSelectedNode();
	const [ r, g, b ] = hue(e.target.value);
	selectedNode.col = `rgb(${r}, ${g}, ${b})`;
	displayLoop();
}
const nodeColorRange = document.getElementById('colorRange');
nodeColorRange.addEventListener('input', handleNodeColorInput);
nodeColorRange.value = '240';

const handleMouseDown = () => {
	mouseHeld = true;
	const mode = getMode();
	const nodes = getNodes();
	let hovered;
	switch(mode) {
		case 'node':
			createNode(mouseX, mouseY);
			break;
		case 'move':
			for(const n of nodes) {
				if(n.checkHover(mouseX, mouseY)) {
					hovered = n;
					break;
				}
			}
			if(hovered) {
				selectNode(hovered)
				mouseDX = hovered.x - mouseX;
				mouseDY = hovered.y - mouseY;
			}
			else
				deselectNode();
			break;
		case 'line':
			for(const n of nodes) {
				if(n.checkHover(mouseX, mouseY)) {
					hovered = n;
					break;
				}
			}
			if(hovered) {
				const selectedNode = getSelectedNode();
				if(selectedNode) {
					connectNodes(selectedNode, hovered);
					deselectNode();
				}
				else
					selectNode(hovered);
			}
			else
				deselectNode();
			break;
	}
	displayLoop();
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
				selectedNode.x = mouseX + mouseDX;
				selectedNode.y = mouseY + mouseDY;
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
