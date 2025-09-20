import Node from './Node.js';
import initControls from './controls.js';
import { getMode, setMode } from './mode.js';
import { getGuideNode, setGuideNode } from './guideNode.js';
import displayLoop from './display.js';

const modes = [ 'node', 'move' ];

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;

let mode = getMode();

const handleWindowResize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
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

	const guideNode = getGuideNode();
	if(mode === 'node')
		setGuideNode(null);

	if(mode === 'move') {
		selectedNode.selected = false;
		selectedNode = null;
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

const createNode = (x, y) => {
	nodes.push(new Node(x, y));
}

initControls();



