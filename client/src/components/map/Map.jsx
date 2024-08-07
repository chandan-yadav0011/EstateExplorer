import React from 'react';
import './Map.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Pin from '../pin/Pin';

function Map({items}) {
    
    return (

        <MapContainer center={items.length===1?[items[0].latitude, items[0].longitude]:[20.5937,78.9629]} zoom={5} scrollWheelZoom={false} className='map'>
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