import styles from './Login.module.css'

export default function Login(){
    return(
        <div className={styles.form}>
           <form className={styles.formlogin}>
            <input className={styles.username} type="text" name="user" id="user" placeholder='Nom d&apos;utilisateur'/>
            <input className={styles.password} type="password" name="password" id="password" placeholder='Mot de Passe' />
            <button className={styles.submit} type="submit">Se Connecter</button>
           </form>
        </div>
    )
}