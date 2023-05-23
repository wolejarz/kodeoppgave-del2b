import React from "react";
import { displayDirection, STATION_INFORMATION_URL, STATION_STATUS_URL } from "../utilities/constants";
import { fetchData } from "../utilities/DataFetching";

interface Iprop {
  data: any[];
  setData: (data: any[]) => void;
  currrentDisplayDirection: displayDirection;
  zoomToMarker?: (stationId: number) => void;
}
class DataGrid extends React.Component<Iprop> {
  stationInformation: any[] = [];
  stationInformationTTL: number = 10;
  columnNames: string[] = ["Navn", "Tilgjengelige låser", "Ledige sykler"];

  componentDidMount() {
    fetchData(STATION_INFORMATION_URL, this.transformStationInformationData.bind(this)).then(() => {
      this.setState({ data: this.stationInformation });
      this.fetchStationStatus();
      setInterval(() => {
        this.fetchStationStatus();
      }, this.stationInformationTTL * 1000);
    });
  }

  private transformStationInformationData(stationInformationAsJSON: any) {
    this.stationInformationTTL = stationInformationAsJSON.ttl;
    this.stationInformation = stationInformationAsJSON.data.stations.map((station: any) => {
      return {
        Id: station.station_id,
        Name: station.name,
        Adress: station.address,
        Available_docks: 0,
        Available_bikes: 0,
        Longitude: station.lon,
        Latitude: station.lat
      };
    });
  }

  private fetchStationStatus() {
    fetchData(STATION_STATUS_URL, this.transformStationStatusData.bind(this));
  }

  private transformStationStatusData(stationStatusAsJSON: any) {
    stationStatusAsJSON.data.stations.forEach((station: any) => {
      const stationIndex = this.stationInformation.findIndex(
        stationInformation => stationInformation.Id === station.station_id
      );
      if (stationIndex === -1) {
        return;
      }
      this.stationInformation[stationIndex]["Available_docks"] = station.num_docks_available;
      this.stationInformation[stationIndex]["Available_bikes"] = station.num_bikes_available;
    });
    this.props.setData(this.stationInformation);
  }

  render() {
    const { data } = this.props;
    const containerStyle =
      this.props.currrentDisplayDirection === displayDirection.horizontal
        ? {
            width: "50vw",
            height: "90vh"
          }
        : {
            width: "100vw",
            height: "45vh"
          };
    return (
      <div style={containerStyle} className="data-grid">
        <table>
          <thead>
            <tr>
              {this.columnNames.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} onClick={ev => this.props.zoomToMarker && this.props.zoomToMarker(row["Id"])}>
                <td>{row["Name"]}</td>
                <td>{row["Available_docks"]}</td>
                <td>{row["Available_bikes"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataGrid;
