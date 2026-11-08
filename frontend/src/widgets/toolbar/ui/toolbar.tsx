import { memo, useCallback, useState } from "react";
import styles from "./toolbar.module.css";
import { Button, Input, PlusIcon, SearchIcon } from "@shared/ui";
import { pluralize } from "@shared/lib/pluralize";

interface ToolbarProps {
  count: number;
  isLoading?: boolean;
  onChangeQuery(value: string): void;
}

export const Toolbar = memo(
  ({ count, isLoading, onChangeQuery }: ToolbarProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleChangeSearchValue = useCallback(
      (value: string) => {
        setInputValue(value);
        onChangeQuery(value);
      },
      [onChangeQuery],
    );

    return (
      <div className={styles.toolbar}>
        <div className="flex items-center gap-4 w-full">
          <Button
            text="Добавить"
            leftAdornment={<PlusIcon height="24px" width="24px" />}
            onClick={() => console.log("test")}
          />
          <div className="w-1/6">
            <Input
              value={inputValue}
              onChange={handleChangeSearchValue}
              placeholder="Найти игру..."
              leftAdornment={<SearchIcon height="24px" width="24px" />}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="flex-none text-xl text-medium">
          {count} {pluralize(count, "игра", "игры", "игр")}
        </div>
      </div>
    );
  },
);
