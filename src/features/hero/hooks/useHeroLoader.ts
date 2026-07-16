import { useState, useEffect } from 'react';
import { progressiveLoader } from '../loader/ProgressiveLoader';
import { heroStateMachine } from '../utils/stateMachine';

export const useHeroLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    progressiveLoader.loadInitialBatch((p) => {
      if (mounted) setProgress(p);
    }).then(() => {
      if (mounted) {
        setIsReady(true);
        heroStateMachine.setState('READY');
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return { progress, isReady };
};
