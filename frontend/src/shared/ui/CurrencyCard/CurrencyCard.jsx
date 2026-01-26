import styles from './CurrencyCard.module.css'
import { useNavigate } from 'react-router-dom';

function CurrencyCard({id, code, name, value, nominal, style, symbol}) {
    const navigate = useNavigate();
    
    let country = code.slice(0, -1).toLowerCase()

    const redirectToCurrency = (id) => {
        navigate(`/currency/${id}`);
    }

    return (
    <span className={styles.wrapper} style={style}>
        <div className={styles.card} onClick={() => redirectToCurrency(id)}>
            <div className={styles.card_top}>
                <img src={`https://flagcdn.com/48x36/${country}.png`} alt="" />
                <div className={styles.text}>
                    <h3>{code}</h3>
                    <p>{name}</p>
                </div>
            </div>
            <div className={styles.card_bottom}>
                <h1>{value} ₽</h1>
                <p> Номинал {nominal}{symbol}</p>
            </div>
        </div>
    </span>
    )
}

export default CurrencyCard
