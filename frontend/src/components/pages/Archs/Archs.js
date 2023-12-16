import styles from './Archs.module.css'

// images
import wanoImg from '../../../assets/img/wanof.jpg'
import wholeImg from '../../../assets/img/whole.jpg'
import marineFord from '../../../assets/img/marineford.jpg'
import eastBlue from '../../../assets/img/east.jpg'

import { Link } from 'react-router-dom';


function Archs() {
    return (
        <>
        <h1 className={styles.h1archs}>Dê seus feedbacks sobre os arcos:</h1>
        <div className={styles.archs}>
            
            {/* Divs for archs */}
            <div className={styles.content}>
                <img src={wanoImg} alt='Arco de wano'/>
                <h3>Wano</h3>
                <Link to = '/archs/wano' className={styles.btn} id={styles.wano}>Comentar</Link>
            </div>

            <div className={styles.content}>
                <img src={wholeImg} alt='Arco de WholeCake'/>
                <h3>Whole Cake</h3>
                <Link to = '/archs/wholeCake' className={styles.btn} id={styles.whole}>Comentar</Link>
            </div>

            <div className={styles.content}>
                <img src={marineFord} alt='Arco de marineFord'/>
                <h3>Marineford</h3>
                <Link to = '/archs/marineford' className={styles.btn}>Comentar</Link>
            </div>

            <div className={styles.content}>
                <img src={eastBlue} alt='Arco de east blue'/>
                <h3>East Blue</h3>
                <Link to = '/archs/eastBlue' className={styles.btn}>Comentar</Link>
            </div>
            
        </div>
        </>
    )
}

export default Archs;