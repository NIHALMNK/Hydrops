import { HERO_SCENES } from '../content/heroScenes';
import { HeroSceneData } from '../types/hero';

export class SceneManager {
  private activeSceneId: string | null = null;
  private onSceneChangeCallbacks: Set<(scene: HeroSceneData) => void> = new Set();

  public updateFromFrame(frame: number) {
    const scene = HERO_SCENES.find(s => frame >= s.startFrame && frame <= s.endFrame);
    if (!scene) return;

    if (this.activeSceneId !== scene.id) {
      this.activeSceneId = scene.id;
      this.onSceneChangeCallbacks.forEach(cb => cb(scene));
    }
  }

  public getActiveSceneId() {
    return this.activeSceneId;
  }

  public subscribe(cb: (scene: HeroSceneData) => void) {
    this.onSceneChangeCallbacks.add(cb);
    return () => this.onSceneChangeCallbacks.delete(cb);
  }
}

export const sceneManager = new SceneManager();
