import type { ReactNode } from 'react';
import cn from 'classnames';

import styles from './svg-container.module.css';

export interface SvgContainerProps {
  color?: string;
  height?: string;
  width?: string;
  children: ReactNode;
  className?: string;
}

export const SvgContainer = ({
  children,
  color,
  className,
  height = '16px',
  width = '16px',
}: SvgContainerProps) => (
  <div className={cn(className, styles.svgContainer)} style={{ color, height, width }}>
    {children}
  </div>
);
