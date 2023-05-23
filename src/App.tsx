import { useEffect, useState } from "react";
import "./App.css";
import DataGrid from "./components/DataGrid";
import DataOnMap from "./components/DataOnMap";
import { displayDirection } from "./utilities/constants";
import { getDisplayDirection } from "./utilities/utilities";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [currentDisplayDirection, setCurrentDisplayDirection] = useState<displayDirection>(displayDirection.horizontal);
  const AppBodyClassName =
    currentDisplayDirection === displayDirection.horizontal ? "App-body-horizontal" : "App-body-vertical";
  const handleResize = () => {
    const newDisplayDirection = getDisplayDirection(currentDisplayDirection);
    console.log("resize", currentDisplayDirection, newDisplayDirection);
    setCurrentDisplayDirection(newDisplayDirection);
  };
  useEffect(() => () => window.addEventListener("resize", handleResize));

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className={AppBodyClassName}>
        <DataGrid data={data} setData={setData} />
        <DataOnMap data={data} />
      </div>
    </div>
  );
}

export default App;
