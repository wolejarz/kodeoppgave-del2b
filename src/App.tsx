import { useEffect, useState } from "react";
import "./App.css";
import DataGrid from "./components/DataGrid";
import DataOnMap from "./components/DataOnMap";
import { displayDirection } from "./utilities/constants";
import { getDisplayDirection, icon } from "./utilities/utilities";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [currentDisplayDirection, setCurrentDisplayDirection] = useState<displayDirection>(
    getDisplayDirection(displayDirection.horizontal)
  );
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
      <header className="App-header">
        {icon}
        <h1>Oslo Bysykkel</h1>
      </header>
      <div className={AppBodyClassName}>
        <DataGrid data={data} setData={setData} currrentDisplayDirection={currentDisplayDirection} />
        <DataOnMap data={data} currrentDisplayDirection={currentDisplayDirection} />
      </div>
    </div>
  );
}

export default App;
