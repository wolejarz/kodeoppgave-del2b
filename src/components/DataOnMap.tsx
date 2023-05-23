import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { displayDirection } from "../utilities/constants";

interface Iprop {
  data: any[];
  currrentDisplayDirection: displayDirection;
}

const center = {
  lat: 59.921491,
  lng: 10.757933
};

class DataOnMap extends Component<Iprop> {
  render() {
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
    const APIkey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
    const iconSize = (window.innerWidth + window.innerHeight) / 120;
    return (
      <LoadScript googleMapsApiKey={APIkey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {this.props.data.map(station => (
            <Marker
              position={{ lat: station.Latitude, lng: station.Longitude }}
              key={station.Id}
              title={station.Name}
              onClick={() => {}}
              icon={{
                url: require("./../assets/location-marker.png"),
                fillColor: "#EB00FF",
                scaledSize: new window.google.maps.Size(iconSize, iconSize)
              }}
            />
          ))}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default DataOnMap;
