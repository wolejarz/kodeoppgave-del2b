import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px"
};

const center = {
  lat: -3.745,
  lng: -38.523
};

class DataOnMap extends Component {
  render() {
    const APIkey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
    return (
      <LoadScript googleMapsApiKey={APIkey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default DataOnMap;
