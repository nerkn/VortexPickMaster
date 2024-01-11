import { useState, StrictMode } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { useRickAndMorty } from "./utils/store/rickAndMorty";
import { MultiSelect } from "./components/multiSelect";
import { Canteen } from "./components/Canteen";
import { useDisney } from "./utils/store/disney";
type ApiType = "ram" | "disney";

function App() {
  const [_count, setCount] = useState(0);
  const [whichApi, whichApiSet] = useState<ApiType>("ram");
  let storeRAM = useRickAndMorty();
  let disneyLand = useDisney();
  storeRAM.apiUrl = "https://rickandmortyapi.com/api/character";
  let random = Math.round(Math.random() * 826);
  let whicApiCLs = (curName: ApiType) =>
    "apiSelector " + (whichApi == curName ? "selected" : "");
  return (
    <>
      <div>
        <img
          src={
            "https://rickandmortyapi.com/api/character/avatar/" +
            random +
            ".jpeg"
          }
        />
      </div>
      <h1>VortexPickMaster</h1>
      <div className="card">
        <div className="flex row">
          <a
            onClick={() => whichApiSet("disney")}
            className={whicApiCLs("disney")}
          >
            Disney
          </a>
          <a onClick={() => whichApiSet("ram")} className={whicApiCLs("ram")}>
            RickAndMorty
          </a>
        </div>
        {whichApi == "ram" ? (
          <MultiSelect fetchCB={storeRAM.search} key={"ram"} />
        ) : (
          <MultiSelect fetchCB={disneyLand.search} key={"disney"} />
        )}

        <button onClick={() => setCount((count) => count + 1)}>
          refresh heading image
        </button>
      </div>
      <p className="read-the-docs">MultiSelect implementation!</p>
      <Canteen />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
