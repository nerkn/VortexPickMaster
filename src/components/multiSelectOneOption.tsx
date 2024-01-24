import { SearchResult } from "../utils/types";

export function MultiSelectOneOption({
  opt,
  enteredTxt,
  selected,
  select,
}: {
  opt: SearchResult;
  enteredTxt: string;
  selected: boolean;
  select: (option: boolean) => void;
}) {
  function name(name: string) {
    if (enteredTxt.length < 1) return name;
    let reg = new RegExp(enteredTxt, "ig");
    let foundName: RegExpExecArray | null;
    let lastIndex = 0;
    let part = [];
    while ((foundName = reg.exec(name)) !== null) {
      part.push(name.slice(lastIndex, foundName.index));
      part.push(<b>{foundName}</b>);
      lastIndex = reg.lastIndex;
    }
    if (lastIndex < name.length) part.push(name.slice(lastIndex));

    return part;
  }
  function episodeCount() {
    switch (opt.epiCount) {
      case 0:
        return "no episodes";
      case 1:
        return "1 episode";
      default:
        return `${opt.epiCount} episodes`;
    }
  }

  return (
    <div
      className={"flex row gap " + (selected ? "selected" : "")}
      tabIndex={0}
      data-id={opt.id}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => select(!selected)}
        tabIndex={-1}
      />
      <img src={opt.image} />
      <div className="flex column items-start gap text-lg">
        <div>{name(opt.name)} </div>
        <div>{episodeCount()} </div>
      </div>
    </div>
  );
}
