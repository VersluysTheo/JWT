import styles from './Adminbutton.module.css'

export default function AddButton(){
    return(
        <div className={styles.addbutton}>
            <button>+</button>
        </div>
    )
}