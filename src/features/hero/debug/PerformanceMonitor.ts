export class PerformanceMonitor {
  private lastTime = performance.now();
  private frames = 0;
  public fps = 60;
  public droppedFrames = 0;
  public longTasks = 0;

  public tick() {
    this.frames++;
    const now = performance.now();
    const elapsed = now - this.lastTime;
    
    if (elapsed >= 1000) {
      this.fps = Math.round((this.frames * 1000) / elapsed);
      if (this.fps < 50) this.droppedFrames++;
      this.frames = 0;
      this.lastTime = now;
    }
  }

  public trackTask(duration: number) {
    if (duration > 50) {
      this.longTasks++;
    }
  }
}
export const performanceMonitor = new PerformanceMonitor();
