import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Leaflet.module.css';

function Leaflet() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7097/api/Salles")
            .then(response => response.json())
            .then(data => setItems(data))
    }, []);

    return (
        <>
            <MapContainer className={styles.map} center={[46.232192999999995, 2.209666999999996]} zoom={5} scrollWheelZoom={true} minZoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map(item => (
                    <Marker key={item.id} position={[item.adresseSalle.localisationAdresse.coordinates[0], item.adresseSalle.localisationAdresse.coordinates[1]]}>
                        <Popup>
                            {item.nom}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}

export default Leaflet;