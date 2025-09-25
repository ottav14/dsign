import { getConnections } from './connections.js';
import { getSwitches } from './switches.js';
import { getLights } from './lights.js';
import Switch from './Switch.js';


export const circuitUpdate = () => {

	const lights = getLights();

	for(const l of lights) l.state = false;

	const connections = getConnections();
	for(const c of connections) {
		const s0 = c[0] instanceof Switch;
		const s1 = c[1] instanceof Switch;
		if((s0 && !c[0].state) || (s1 && !c[1].state) || (s0 && s1))
			continue
		
		if((!s0 && !s1 && (c[0].state || c[1].state)) || (s0 || s1)) {			
			c[0].state = true;
			c[1].state = true;
		}
	}
}
