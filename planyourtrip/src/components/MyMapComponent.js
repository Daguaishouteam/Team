import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = (compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng")) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng")) }} onClick={props.onMarkerClick} />}
  </GoogleMap>
))