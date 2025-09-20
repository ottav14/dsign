const ctx = document.getElementById('canvas').getContext('2d');

const drawLine = (x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}


class Node {
	constructor(x, y, guide=false) {
		this.x = x;
		this.y = y;
		this.w = 100;
		this.h = 100;
		this.guide = guide;
		this.selected = false;
	}

	display() {
		const hw = this.w/2;
		const hh = this.h/2;

		// Styling
		ctx.fillStyle = this.guide ? 'rgba(77, 77, 77, 0.7)' : 'rgb(0, 0, 255)';

		// Middle
		ctx.fillRect(this.x-hw, this.y-hh, this.w, this.h);

		// Left arc
		ctx.beginPath();
		ctx.arc(this.x-hw, this.y, hh, Math.PI/2, 3*Math.PI/2);

		// Right arc
		ctx.moveTo(this.x+hw, this.y-hh);
		ctx.arc(this.x+hw, this.y, hh, -Math.PI/2, Math.PI/2);

		ctx.fill();

		// Selected
		if(this.selected) {
			ctx.stroke();

			drawLine(this.x-hw, this.y-hh, this.x+hw, this.y-hh);
			drawLine(this.x-hw, this.y+hh, this.x+hw, this.y+hh);
		}

	}

	checkHover(mx, my) {
		const hw = this.w/2;
		const hh = this.h/2;
		return mx >= this.x-hw-hh && mx < this.x+hw+hh &&
			   my >= this.y-hh    && my < this.y+hh;
	}
}
export default Node;
