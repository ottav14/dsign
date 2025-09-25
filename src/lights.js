import Light from './Light.js';

const lights = [];
export const getLights = () => lights;
export const createLight = (x, y) => lights.push(new Light(x, y));
