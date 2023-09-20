import React from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from '../../styles/Home.module.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

////////////////////////////////////////////////////////////////////////////////

const Map = ({ latitude, longitude }) => {

  const position = [latitude, longitude]

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <MapContainer className={styles.mapContainer} center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
};

export default Map;