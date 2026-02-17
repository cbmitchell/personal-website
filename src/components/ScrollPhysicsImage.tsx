import { useRef, type CSSProperties, type MutableRefObject } from 'react';
import { useScrollPhysics } from '../hooks/useScrollPhysics';
import type { ScrollPhysicsElement, ScrollPhysicsOptions } from '../lib/ScrollPhysicsElement';

export interface ScrollPhysicsImageProps extends ScrollPhysicsOptions {
  /** Pixel width/height of the <img> (default 512). */
  size?: number;
  /** Extra class name on the outer wrapper. */
  className?: string;
  /** Extra inline styles on the outer wrapper. */
  style?: CSSProperties;
  /** Ref to the live ScrollPhysicsElement instance for imperative access. */
  instanceRef?: MutableRefObject<ScrollPhysicsElement | null>;
}

export function ScrollPhysicsImage({
  size = 512,
  className,
  style,
  instanceRef: externalRef,
  ...physicsOptions
}: ScrollPhysicsImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const physicsRef = useScrollPhysics(imgRef, physicsOptions);

  // Expose the instance to the parent if they passed a ref
  if (externalRef) {
    externalRef.current = physicsRef.current;
  }

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1000,
        ...style,
      }}
    >
      <img
        ref={imgRef}
        alt=""
        width={size}
        height={size}
        style={{
          display: 'block',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
