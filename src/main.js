import Switch from './Switch.js';
import initControls from './controls.js';
import { getMode, setMode } from './mode.js';
import displayLoop from './display.js';
import { circuitUpdate } from './circuit.js';

const modes = [ 'switch', 'light', 'move', 'line', 'interact' ];

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

	switchActiveButton(newMode);
	setMode(newMode);

}
for(const m of modes)
	document.getElementById(`${m}Button`).addEventListener('click', () => switchMode(m));

const createSwitch = (x, y) => {
	nodes.push(new Switch(x, y));
}

initControls();

const update = () => {

	displayLoop();
	circuitUpdate();

	requestAnimationFrame(update);
}
update();



