import { useState } from "react";
import "./App.css";
import DataGrid from "./components/DataGrid";
import DataOnMap from "./components/DataOnMap";

function App() {
  const [data, setData] = useState<any[]>([]);
  return (
    <div className="App">
      <header className="App-header"></header>
      <DataGrid data={data} setData={setData} />
      <DataOnMap data={data} />
    </div>
  );
}

export default App;
