export const clearCanvas = () => {
	const ctx = document.getElementById('canvas').getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

