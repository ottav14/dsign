import { getMode } from './mode.js';
import { drawCircle } from './draw.js';
import { getSelected, setSelected } from './selected.js';

const ctx = document.getElementById('canvas').getContext('2d');

class Light {
	constructor(x, y, guide=false) {
		this.x = x;
		this.y = y;
		this.connections = [];
		this.state = false;
	}

	display() {
		const col = this.state ? '#ff0' : '#fff';
		drawCircle(this.x, this.y, col, false);
	}

	checkHover(mx, my) {
		const dx = mx - this.x;
		const dy = my - this.y;
		const d = Math.sqrt(dx*dx + dy*dy);
		return d <= 50;
	}

	select() {
		const selected = getSelected();
		setSelected(this);
	}
}
export default Light;
