import { frameStats } from './FrameStats';
import { performanceMonitor } from './PerformanceMonitor';
import { heroStateMachine } from '../utils/stateMachine';
import { sceneManager } from '../timeline/SceneManager';

export const HeroDebugger = {
  getMetrics: () => {
    return {
      fps: performanceMonitor.fps,
      loadedFrames: frameStats.loaded,
      decodedFrames: frameStats.decoded,
      cacheSize: frameStats.currentCache,
      peakCache: frameStats.peakCache,
      droppedFrames: performanceMonitor.droppedFrames,
      state: heroStateMachine.getState(),
      activeScene: sceneManager.getActiveSceneId() || 'None',
    };
  }
};
