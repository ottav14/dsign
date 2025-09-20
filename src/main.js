import Node from './Node.js';
import { deselectNode } from './Node.js';
import initControls from './controls.js';
import { getMode, setMode } from './mode.js';
import { getGuideNode, setGuideNode } from './guideNode.js';
import { getSelectedNode, setSelectedNode } from './selectedNode.js';
import displayLoop from './display.js';
import { showNodeInfo, hideNodeInfo } from './nodeInfoDisplay.js';

const modes = [ 'node', 'move', 'line' ];

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;

const handleWindowResize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.lineWidth = 4;
	displayLoop();
}
window.addEventListener('resize', handleWindowResize);

const disableButtons = () => {
	for(const m of modes)
		document.getElementById(`${m}Button`).classList.remove('activeButton');
}

const switchActiveButton = (m) => {
	disableButtons();
	document.getElementById(`${m}Button`).classList.add('activeButton');
}

const switchMode = (newMode) => {

	const mode = getMode();

	switch(mode) {
		case 'node':
			setGuideNode(null);
			break;
		case 'move':
			deselectNode();
			break;
	}

	switchActiveButton(newMode);
	switch(newMode) {
		case 'node':
			break;
		case 'move':
			break;
	}
	setMode(newMode);

	displayLoop();
}
document.getElementById('nodeButton').addEventListener('click', () => switchMode('node'));
document.getElementById('moveButton').addEventListener('click', () => switchMode('move'));
document.getElementById('lineButton').addEventListener('click', () => switchMode('line'));

const createNode = (x, y) => {
	nodes.push(new Node(x, y));
}

initControls();


