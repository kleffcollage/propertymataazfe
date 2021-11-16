import {withGoogleMap, GoogleMap,withScriptjs,Marker } from "react-google-maps";
import React from 'react'

export const MapView = withScriptjs(withGoogleMap(({lng,lat})=> 
    <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: lat, lng: lng }}
  >
      <Marker
          position={{
            lat: lat,
            lng: lng
          }}
          
        />
  </GoogleMap>
))

export default MapView;
