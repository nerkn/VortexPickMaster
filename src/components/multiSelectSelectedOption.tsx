import { SearchResult } from "../utils/types";

export function MultiSelectSelectedOption({
  opt,
  select,
}: {
  opt: SearchResult;
  select: (option: boolean) => void;
}) {
  return (
    <div className="selectedOption" tabIndex={0} data-id={opt.id}>
      {opt.name}
      <a onClick={() => select(false)}>x</a>
    </div>
  );
}
