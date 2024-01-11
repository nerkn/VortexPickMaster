import { useState, StrictMode } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { useRickAndMorty } from "./utils/store/rickAndMorty";
import { MultiSelect } from "./components/multiSelect";
import { Canteen } from "./components/Canteen";

function App() {
  const [_count, setCount] = useState(0);
  let storeRAM = useRickAndMorty();
  storeRAM.apiUrl = "https://rickandmortyapi.com/api/character";
  let random = Math.round(Math.random() * 826);

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
        <MultiSelect fetchCB={storeRAM.search} />
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
