import { clearCanvas } from './draw.js';
import { getGuideNode } from './guideNode.js';
import { getNodes } from './nodes.js';
import { getSelectedNode } from './selectedNode.js';

const displayLoop = () => {
	clearCanvas();	

	const nodes = getNodes();
	for(const n of nodes)
		if(!n.selected)
			n.display();

	const selectedNode = getSelectedNode();
	if(selectedNode)
		selectedNode.display();

	const guideNode = getGuideNode();
	if(guideNode)
		guideNode.display();

}
export default displayLoop;
