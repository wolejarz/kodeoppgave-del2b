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
  const [map, setMap] = useState<any>(null);

  const handleResize = () => {
    const newDisplayDirection = getDisplayDirection(currentDisplayDirection);
    setCurrentDisplayDirection(newDisplayDirection);
  };

  const handleZoomToMarker = (stationId: number) => {
    const station = data.find(station => station.Id === stationId);
    if (station) {
      map.setZoom(15);
      map.panTo({ lat: station.Latitude, lng: station.Longitude });
    }
  };

  useEffect(() => () => window.addEventListener("resize", handleResize));

  const AppBodyClassName =
    currentDisplayDirection === displayDirection.horizontal ? "App-body-horizontal" : "App-body-vertical";

  return (
    <div className="App">
      <header className="App-header">
        {icon}
        <h1>Oslo Bysykkel</h1>
      </header>
      <div className={AppBodyClassName}>
        <DataGrid
          data={data}
          setData={setData}
          currrentDisplayDirection={currentDisplayDirection}
          zoomToMarker={handleZoomToMarker}
        />
        <DataOnMap data={data} currrentDisplayDirection={currentDisplayDirection} setMap={setMap} />
      </div>
    </div>
  );
}

export default App;
