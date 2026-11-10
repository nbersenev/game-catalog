import { GamepadIcon, Input, SearchIcon } from "@shared/ui";
import { memo, useCallback, useState } from "react";
import { AddGameButton } from "@features/add-game";
import { pluralize } from "@shared/lib/pluralize";

import styles from "./toolbar.module.css";

interface ToolbarProps {
  count: number;
  isLoading?: boolean;
  onChangeQuery(value: string): void;
}

export const Toolbar = memo(({ count, isLoading, onChangeQuery }: ToolbarProps) => {
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
        <AddGameButton />
        <div className="w-1/4">
          <Input
            value={inputValue}
            onChange={handleChangeSearchValue}
            placeholder="Найти игру..."
            leftAdornment={<SearchIcon height="24px" width="24px" />}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-none items-center gap-4">
        <GamepadIcon height="24px" width="24px" />
        <div className="text-xl text-medium">
          {count} {pluralize(count, "игра", "игры", "игр")}
        </div>
      </div>
    </div>
  );
});
