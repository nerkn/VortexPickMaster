import { useEffect, useRef, useState } from "react";
import { FetchCb, FormEvent, SearchResult } from "../utils/types";
import { MultiSelectOneOption } from "./multiSelectOneOption";
import { MultiSelectSelectedOption } from "./multiSelectSelectedOption";
import { useToast } from "../utils/store/toast";

export function MultiSelect({ fetchCB }: { fetchCB: FetchCb }) {
  const msref = useRef<HTMLDivElement>(null);
  const storeToast = useToast();
  const [selected, selectedSet] = useState<SearchResult[]>([]);
  const [enteredTxt, enteredTxtSet] = useState("");
  const [listSearch, listSearchSet] = useState<SearchResult[]>([]);

  useEffect(() => {
    fetchCB(enteredTxt)
      .then((s) => {
        listSearchSet(s);
        if (!s.length) storeToast.add(" Empty result returned " + enteredTxt);
      })
      .finally(() => {});
  }, [enteredTxt]);

  const toggleSelected = (id: number) => {
    if (selected.find((s) => s.id == id)) {
      selectedSet((s) => s.filter((se) => se.id != id));
    } else {
      let opt = listSearch.find((ls) => ls.id == id);
      if (typeof opt !== "undefined") selectedSet((s) => [...s, opt!]);
    }
  };

  function keyProcess(e: React.KeyboardEvent<HTMLDivElement>) {
    if (msref.current) {
      let allTI = msref.current.querySelectorAll(
        "[tabIndex='0']"
      ) as NodeListOf<HTMLDivElement>;
      let index = 0;
      allTI.forEach((elem, k) => {
        if (elem == document.activeElement) index = k;
      });

      let isInputElem = allTI[index].nodeName == "INPUT";
      switch (e.code) {
        // @ts-ignore Fallthrough case in switch.
        case "ArrowRight":
          if (isInputElem) {
            if (
              (document.activeElement as HTMLInputElement).selectionStart !=
              (document.activeElement as HTMLInputElement).value.length
            )
              return;
          }
        case "ArrowDown":
          allTI[(index + 1) % allTI.length].focus();
          break;
        // @ts-ignore Fallthrough case in switch.
        case "ArrowLeft":
          if (isInputElem) {
            if ((document.activeElement as HTMLInputElement).selectionStart)
              return;
          }
        case "ArrowUp":
          allTI[(index + allTI.length - 1) % allTI.length].focus();
          break;
        case "Enter":
        case "Space":
          if (!isInputElem) {
            toggleSelected(parseInt(allTI[index].dataset?.id || "0"));
            e.preventDefault();
          }
      }

      return;
    }
  }

  return (
    <div
      className="multiselect"
      onBlur={(e) =>
        e.relatedTarget?.closest(".multiselect") ? "" : listSearchSet([])
      }
      onKeyDown={keyProcess}
      ref={msref}
    >
      <div className="box">
        {selected.map((ls) => (
          <MultiSelectSelectedOption
            key={ls.id}
            opt={ls}
            select={() => toggleSelected(ls.id)}
          />
        ))}
        <input
          onInput={(e: FormEvent) => enteredTxtSet(e.target.value)}
          className="disappear"
          tabIndex={0}
        />
      </div>
      <div className="dropDownList">
        {listSearch.map((ls) => (
          <MultiSelectOneOption
            opt={ls}
            key={ls.id}
            enteredTxt={enteredTxt}
            select={() => toggleSelected(ls.id)}
            selected={!!selected.find((s) => s.id == ls.id)}
          />
        ))}
      </div>
    </div>
  );
}
