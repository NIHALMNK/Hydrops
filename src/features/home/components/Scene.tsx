import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface SceneProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  height?: string;
  as?: React.ElementType;
}

export const Scene = forwardRef<HTMLElement, SceneProps>(
  ({ children, className, height = 'min-h-screen', as: Component = 'section', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('relative w-full overflow-hidden flex flex-col', height, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Scene.displayName = 'Scene';
