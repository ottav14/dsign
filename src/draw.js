const ctx = document.getElementById('canvas').getContext('2d');

export const drawLine = (x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

export const strokeCircle = (x, y) => {
	ctx.beginPath();
	ctx.arc(x, y, 50, 0, 2*Math.PI);
	ctx.fill();
}

export const fillCircle = (x, y) => {
	ctx.beginPath();
	ctx.arc(x, y, 50, 0, 2*Math.PI);
	ctx.fill();
}

export const drawCircle = (x, y, col='#fff', guide=false) => {
	ctx.beginPath();
	ctx.arc(x, y, 50, 0, 2*Math.PI);

	ctx.fillStyle = `${col}${guide ? 9 : 'f'}`;
	ctx.fill();
	ctx.stroke();
}

export const drawCurve = (p0, p1, p2, p3) => {
	ctx.strokeStyle = '#000'
	ctx.beginPath();
	ctx.moveTo(p0.x, p0.y);
	ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
	ctx.lineWidth = 4;
	ctx.stroke();
}

export const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

