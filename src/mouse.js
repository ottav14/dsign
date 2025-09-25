let mouseX = 0;
let mouseY = 0;

const getMousePos = () => {
	return [ mouseX, mouseY ];
}
export default getMousePos;

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});
