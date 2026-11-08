import { memo, useState } from "react";
import styles from "./toolbar.module.css";
import { Button, Input, PlusIcon, SearchIcon } from "@shared/ui";
import { pluralize } from "@shared/lib/pluralize";

interface ToolbarProps {
  count: number;
}

export const Toolbar = memo(({ count }: ToolbarProps) => {
  const [searchValue, setSearchValue] = useState("");

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
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Найти игру..."
            leftAdornment={<SearchIcon height="24px" width="24px" />}
          />
        </div>
      </div>
      <div className="flex-none text-xl text-medium">
        {count} {pluralize(count, "игра", "игры", "игр")}
      </div>
    </div>
  );
});
