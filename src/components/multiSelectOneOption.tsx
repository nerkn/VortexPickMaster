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
    if (enteredTxt.length < 3) return name;
    let reg = new RegExp(enteredTxt, "ig");
    let newName = name.split(reg);
    let newnewName = [];
    for (let n in newName) {
      newnewName.push(newName[n]);
      if (+n < newName.length - 1) {
        newnewName.push(<b>{enteredTxt}</b>);
      }
    }
    return newnewName;
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
