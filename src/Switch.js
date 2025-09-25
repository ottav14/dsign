import { drawLine, drawCircle } from './draw.js';
import { getSelected, setSelected } from './selected.js';
import { getMode } from './mode.js';
import { addConnection } from './connections.js';

export const switchRadius = 50;
const ctx = document.getElementById('canvas').getContext('2d');

export const connectSwitches = (s1, s2) => {
	if(!s1.connections.includes(s2) && s1 !== s2) {
		s1.connections.push(s2);
		s2.connections.push(s1);
		addConnection([s1, s2]);
	}
}

class Switch {
	constructor(x, y, guide=false) {
		this.x = x;
		this.y = y;
		this.guide = guide;
		this.selected = false;
		this.connections = [];
		this.text = '';
		this.state = false;
	}

	display() {
		const col = this.state ? '#0f0' : '#f00';
		drawCircle(this.x, this.y, col, false);
	}

	checkHover(mx, my) {
		const dx = mx - this.x;
		const dy = my - this.y;
		const d = Math.sqrt(dx*dx + dy*dy);
		return d <= switchRadius;
	}

	select() {
		const selectedSwitch = getSelected();
		if(selectedSwitch)
			selectedSwitch.selected = false;

		this.selected =  true;
		setSelected(this);
	}

	toggle() {
		this.state = !this.state;
	}
}
export default Switch;
