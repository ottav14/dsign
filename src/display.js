import { clearCanvas, drawLine, drawCurve, drawCircle } from './draw.js';
import { getSwitches } from './switches.js';
import { getSelected } from './selected.js';
import { getConnections } from './connections.js';
import { getMode } from './mode.js';
import getMousePos from './mouse.js';
import { getLights } from './lights.js';

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

		const r = 50;
		const p0 = { x: left.x+r,  y: left.y };
		const p3 = { x: right.x-r, y: right.y };

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

	const switches = getSwitches();
	for(const s of switches)
		s.display();

	const lights = getLights();
	for(const l of lights)
		l.display();

	const mode = getMode();
	const ctx = document.getElementById('canvas').getContext('2d');
	const [ mouseX, mouseY ] = getMousePos();
	switch(mode) {
		case 'switch':
			drawCircle(mouseX, mouseY, '#f00', true);
			break;
		case 'light':
			drawCircle(mouseX, mouseY, '#fff', true);
			break;
	}

}
export default displayLoop;
