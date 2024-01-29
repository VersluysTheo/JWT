import React, { useState, useEffect } from 'react';
import styles from './Cards.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function Cards() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("https://localhost:7097/api/Salles")
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  useEffect(() => {
    const filtered = items.filter(item => {
      const title = item.nom.toLowerCase();
      const styles = item.styles.join(', ').toLowerCase();
      const address = `${item.adresseSalle.numero} ${item.adresseSalle.voie}, ${item.adresseSalle.codePostal} ${item.adresseSalle.ville}`.toLowerCase();

      return (
        title.includes(searchTerm) ||
        styles.includes(searchTerm) ||
        address.includes(searchTerm)
      );
    });

    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div>
      <div className={styles.searchbar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Rechercher une salle de concert"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.container}>
        {filteredItems.map(item => (
          <div className={styles.card} key={item.id}>
            <Link to={`/salles/${item.id}`} className={styles.cardLink} style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.styles.join(', ')}
                    </Typography>
                    <Typography>
                      {item.adresseSalle.numero} {item.adresseSalle.voie}, {item.adresseSalle.codePostal} {item.adresseSalle.ville}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;