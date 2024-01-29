import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Cards/Cards.module.css';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles1 from '../SingleCard/SingleCard.module.css';

const LocationMarker = ({ coordinates }) => {
  const [position, setPosition] = useState(coordinates);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>La salle est ici.</Popup>
    </Marker>
  );
};

function SingleCard() {
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7097/api/Salles/id?id=${id}`)
      .then(response => response.json())
      .then(data => setCardDetails(data))
      .catch(error => console.error('Erreur lors de la récupération des détails de la carte :', error));
  }, [id]);

  const handleReturn = () => {
    navigate('/');
  };

  if (!cardDetails) {
    return <div></div>;
  }

  const eventHandlers = {
    click: () => {
    },
    locationfound: (e) => {
    },
  };

  return (
    <>
      <button onClick={handleReturn}>
        Retour
      </button>
      <div className={styles.container}>
        <div className={styles1.singleCard} key={cardDetails.id}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cardDetails.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardDetails.styles.join(', ')}
                </Typography>
                <Typography>
                  {cardDetails.adresseSalle.numero} {cardDetails.adresseSalle.voie}, {cardDetails.adresseSalle.codePostal} {cardDetails.adresseSalle.ville}
                  <MapContainer
                    center={cardDetails.adresseSalle.localisationAdresse.coordinates}
                    zoom={15} minZoom={10}
                    style={{ height: '400px', width: '100%' }}
                    events={eventHandlers}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker coordinates={cardDetails.adresseSalle.localisationAdresse.coordinates} />
                  </MapContainer>
                  <p>Capacité de la salle : {cardDetails.capacite} personnes</p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </>
  );
}

export default SingleCard;