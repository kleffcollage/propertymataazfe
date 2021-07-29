import {withGoogleMap, GoogleMap,withScriptjs,Marker } from "react-google-maps";
import React from 'react'

export const MapView = withScriptjs(withGoogleMap(()=> 
    <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 6.5321906, lng: 3.3161349 }}
  >
      <Marker
          position={{
            lat: 6.5321906,
            lng: 3.3161349
          }}
          
        />
  </GoogleMap>
))
