import Switch from './Switch.js';

const switches = [];
export const getSwitches = () => switches;
export const createSwitch = (x, y) => switches.push(new Switch(x, y));
