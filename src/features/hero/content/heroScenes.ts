import { HeroSceneData } from '../types/hero';
import { FRAME_MANIFEST } from './frameManifest';

export const HERO_SCENES: HeroSceneData[] = [
  { id: 'scene-1', startFrame: 1, endFrame: 30, title: "Pure Coconut.", alignment: 'center', theme: 'light', overlayOpacity: 0.3, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-2', startFrame: 31, endFrame: 70, title: "Double Filtered.", alignment: 'center', theme: 'light', overlayOpacity: 0.3, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-3', startFrame: 71, endFrame: 120, title: "Crystal Clear.", alignment: 'center', theme: 'light', overlayOpacity: 0.3, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-4', startFrame: 121, endFrame: 170, title: "Naturally Rich.", alignment: 'center', theme: 'light', overlayOpacity: 0.4, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-5', startFrame: 171, endFrame: 220, title: "No Artificial Additives.", alignment: 'center', theme: 'light', overlayOpacity: 0.4, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-6', startFrame: 221, endFrame: 270, title: "Every Drop Matters.", alignment: 'center', theme: 'light', overlayOpacity: 0.5, textColor: '#fff', animationPreset: 'fade' },
  { id: 'scene-7', startFrame: 271, endFrame: FRAME_MANIFEST.length, title: "Hydrops.", subtitle: "Experience Crystal Clear Coconut Oil.", alignment: 'center', theme: 'light', overlayOpacity: 0.6, textColor: '#fff', animationPreset: 'fade' },
];
