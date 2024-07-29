import React from 'react';
import './Map.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Pin from '../pin/Pin';

function Map({items}) {
    return (
        <MapContainer center={[52.4797, -0.09]} zoom={7} scrollWheelZoom={false} className='map'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            items.map((item)=>(
                <Pin key={item.id} item={item}/>
            ))
        }
      </MapContainer>
    );
}

export default Map;