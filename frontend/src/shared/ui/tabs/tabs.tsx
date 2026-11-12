import { useCallback } from 'react';
import cn from 'classnames';
import styles from './tabs.module.css';

interface TabsProps<T extends string> {
  value: T;
  onChange(value: T): void;
  tabs: {
    value: T;
    label: string;
  }[];
}

export const Tabs = <T extends string>({ onChange, tabs, value }: TabsProps<T>) => {
  const handleClickFactory = useCallback((value: T) => () => onChange(value), []);

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <div
          key={tab.value}
          className={cn(styles.tab, { [styles.active]: tab.value === value })}
          onClick={handleClickFactory(tab.value)}>
          {tab.label}
        </div>
      ))}
    </div>
  );
};
