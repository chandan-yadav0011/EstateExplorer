import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom';
import './Pin.scss'

function Pin({item}) {
  
    return (
        <Marker position={[item.latitude, item.longitude]} className='pin'>
          <Popup>

            <div className='popupContainer'>
                <img src={item.images[0]} alt=''/>
                <div className='textContainer'>
                    <Link to= {`/${item.id}`}>
                        {item.title} 
                    </Link>

                    <span>{item.bedroom} bedroom</span>
                    <b>$ {item.price}</b>
                </div>
            </div>
            
          </Popup>
        </Marker>
    );
}

export default Pin;