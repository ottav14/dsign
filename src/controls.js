import Switch from './Switch.js';
import { connectSwitches } from './Switch.js';
import { getMode } from './mode.js';
import { getSelected, setSelected, deselect } from './selected.js';
import displayLoop from './display.js';
import { createSwitch, getSwitches } from './switches.js';
import { addConnection } from './connections.js';
import { createLight, getLights } from './lights.js';

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

const checkHovers = () => {
	let hovered = null;
	const switches = getSwitches();
	for(const s of switches) {
		if(s.checkHover(mouseX, mouseY)) {
			hovered = s;
			break;
		}
	}

	const lights = getLights();
	for(const l of lights) {
		if(l.checkHover(mouseX, mouseY)) {
			hovered = l;
			break;
		}
	}
	return hovered;
}

const handleMouseDown = () => {
	mouseHeld = true;
	const mode = getMode();
	const switches = getSwitches();
	const lights = getLights();
	let hovered;
	switch(mode) {
		case 'switch':
			createSwitch(mouseX, mouseY);
			break;
		case 'light':
			createLight(mouseX, mouseY);
			break;
		case 'move':
			hovered = checkHovers();

			if(hovered) {
				hovered.select();
				mouseDX = hovered.x - mouseX;
				mouseDY = hovered.y - mouseY;
			}
			else
				deselect();
			break;
		case 'line':
			hovered = checkHovers();
			if(hovered) {
				const selected = getSelected();
				if(selected) {
					addConnection([selected, hovered]);
					deselect();
				}
				else
					hovered.select();
			}
			else
				deselect();
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
	const selected = getSelected();
	mouseX = e.clientX;
	mouseY = e.clientY;

	switch(mode) {
		case 'move':
			if(mouseHeld && selected) {
				selected.x = mouseX + mouseDX;
				selected.y = mouseY + mouseDY;
				displayLoop();
			}
			break;
	}
	displayLoop();
}

const initControls = () => {
	document.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mouseup', handleMouseUp);
}
export default initControls;
