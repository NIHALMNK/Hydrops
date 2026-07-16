export const HeroLogger = {
  warn: (data: { frame?: number, scene?: string, reason: string }) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Hero] Warning:`, data);
    }
  },
  error: (data: { frame?: number, scene?: string, reason: string, error?: unknown }) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Hero] Error:`, data);
    }
  },
  info: (msg: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Hero] ${msg}`, data || '');
    }
  }
};
