import styles from './Listbox.module.css'
// Pas besoin d'installer de dépendances pour importer PropTypes
import PropTypes from 'prop-types';

// Declaration du type de sortie de props 
Listbox.propTypes = {
    // pour savoir quoi mettre a gauche et a droite :
    // a gauche c'est le nom donnée dans ton composant parent
    // a droite c'est le type du props et ça depend de ta sortie
    setStyle: PropTypes.func
};

export default function Listbox({ setStyle }) {


    function filtrerStyle(e) {
        // e.target.value  = les valeurs de la listbox ( donc la liste des styles de musique présents )
        setStyle(e.target.value);
    }

    let styleslist = [
        { name: 'rock' },
        { name: 'jazz' },
        { name: 'funk' },
        { name: 'rap' },
        { name: 'metal' },
        { name: 'electronic' },
        { name: 'indie' },
        { name: 'classical' },
        { name: 'opera' },
        { name: 'hip-hop' },
        { name: 'blues rock' }
    ];

    return (
        <div className={styles.listbox}>
            <select onChange={filtrerStyle} className={styles.selectlist} name="style-select" id="style-select">
                <option value="">Choississez un style :</option>
                {styleslist.map(style => {
                    return (
                        <option key={style.name} value={style.name}>{style.name}</option>
                    )
                })}
            </select>
        </div>
    )
}