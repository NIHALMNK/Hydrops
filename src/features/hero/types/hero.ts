export type HeroSceneData = {
  id: string;
  startFrame: number;
  endFrame: number;
  title: string;
  subtitle?: string;
  alignment: 'center' | 'left' | 'right';
  theme: 'light' | 'dark';
  overlayOpacity: number;
  textColor: string;
  animationPreset: 'fade' | 'blur' | 'scale';
};

export type HeroState = 'LOADING' | 'READY' | 'PLAYING' | 'FINAL_SCENE' | 'UNPINNED';
