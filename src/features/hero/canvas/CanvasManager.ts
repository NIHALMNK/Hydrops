export class CanvasManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  
  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.resize();
  }

  public resize() {
    if (!this.canvas) return;
    // Cap at 1.5: full dpr on HiDPI draws a 2×+ canvas every scroll tick.
    // The difference is imperceptible during motion and halves GPU cost on Retina screens.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    // Set actual size in memory (scaled to account for extra pixel density)
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    // Set display size
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  public getContext() {
    return this.ctx;
  }

  public getCanvas() {
    return this.canvas;
  }

  public clear() {
    if (!this.ctx || !this.canvas) return;
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, rect.width, rect.height);
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.canvas = null;
    this.ctx = null;
  }
}

export const canvasManager = new CanvasManager();
