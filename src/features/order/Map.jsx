import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';

export default function Map({customer}){


    const lat = customer?.split(',')[0]?.split('/')[0];
    const lng = customer?.split(',')[0]?.split('/')[1];

    if(!lat || !lng) return null;

    return <div className={styles.mapContainer}>   
     <MapContainer className={styles.map} center={[Number(lat),Number(lng)]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       <Marker position={[Number(lat),Number(lng)]}>
        <Popup>
            Your Address 🏠
        </Popup>
        </Marker>
    </MapContainer>
      </div>
}