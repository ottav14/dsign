import { getSelectedNode } from './selectedNode.js';

const infoDisplay = document.getElementById('nodeInfo');
const nodeTextInput = document.getElementById('nodeTextInput');

export const showNodeInfo = () => {
	const selectedNode = getSelectedNode();
	nodeTextInput.value = selectedNode.text;	
	infoDisplay.classList.remove('hidden');
	
}
export const hideNodeInfo = () => infoDisplay.classList.add('hidden');
