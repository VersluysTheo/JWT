import styles from './Adminbutton.module.css';

function ModifAdmin(){
    return(
        <div className={styles.container}>
            <button className={styles.adminmodif}> Modifier</button>
            <button className={styles.adminsuppr}>Supprimer</button>
        </div>
    )
}

export default ModifAdmin;