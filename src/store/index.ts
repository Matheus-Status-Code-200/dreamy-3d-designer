import { proxy } from 'valtio';

export const state = proxy({
  intro: true,
  color: '#64748b',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});