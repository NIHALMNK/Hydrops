export class FrameStats {
  public loaded = 0;
  public decoded = 0;
  public evicted = 0;
  public reused = 0;
  public peakCache = 0;
  public currentCache = 0;

  public updateCache(current: number) {
    this.currentCache = current;
    if (current > this.peakCache) this.peakCache = current;
  }
}
export const frameStats = new FrameStats();
