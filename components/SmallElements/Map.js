import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Home.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { Icon } from 'leaflet';

const Map = () => {

  // const customMarkerIcon = new Icon({
  //   iconUrl: '../public/images/pushPin.png',
  //   iconSize: [41, 41],
  // });

  const position = [48.973526, 2.201292]
  return (
    <MapContainer className={styles.mapContainer} center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker 
    position={position}
    // icon={customMarkerIcon}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
   )
};

export default Map;