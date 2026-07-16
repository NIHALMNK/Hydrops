export class FrameCache {
  private cache: Map<string, ImageBitmap | HTMLImageElement> = new Map();
  // Using 300 to cache all frames for the hero, avoiding purges during scroll
  private maxCacheSize = 350; 

  public async loadFrame(src: string): Promise<ImageBitmap | HTMLImageElement> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        try {
          if (typeof window.createImageBitmap !== 'undefined') {
            const bitmap = await window.createImageBitmap(img);
            this.addToCache(src, bitmap);
            resolve(bitmap);
          } else {
            this.addToCache(src, img);
            resolve(img);
          }
        } catch {
          // fallback
          this.addToCache(src, img);
          resolve(img);
        }
      };
      img.onerror = () => reject(new Error(`Frame could not be loaded.\nURL: ${src}`));
    });
  }

  private addToCache(src: string, image: ImageBitmap | HTMLImageElement) {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        const item = this.cache.get(firstKey);
        if (item instanceof ImageBitmap) {
          item.close();
        }
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(src, image);
  }

  public get(src: string) {
    return this.cache.get(src);
  }

  public clear() {
    for (const item of this.cache.values()) {
      if (item instanceof ImageBitmap) {
        item.close();
      }
    }
    this.cache.clear();
  }
}

export const frameCache = new FrameCache();
