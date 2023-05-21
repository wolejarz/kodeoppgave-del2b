import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Iprop {
  data: any[];
}
const containerStyle = {
  width: "50vw",
  height: "100vh"
};

const center = {
  lat: 59.921491,
  lng: 10.757933
};

class DataOnMap extends Component<Iprop> {
  render() {
    const APIkey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
    return (
      <LoadScript googleMapsApiKey={APIkey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {this.props.data.map(station => (
            <Marker
              position={{ lat: station.Latitude, lng: station.Longitude }}
              key={station.Id}
              title={station.Name}
              onClick={() => {}}
            />
          ))}
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default DataOnMap;
