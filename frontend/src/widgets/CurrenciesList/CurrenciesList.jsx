import styles from './CurrenciesList.module.css'
import CurrencyCard from '../../shared/ui/CurrencyCard/CurrencyCard.jsx'

function CurrenciesList({data}) {
  return (
    <div className={styles.currencies_list}>
      {data.map((item, i) => (
        <CurrencyCard 
        id={item.id} 
        code={item.code}
        name={item.name}
        value={item.value}
        nominal={item.nominal}
        symbol={item.symbol}
        style={{ animationDelay: `${i * 40}ms` }}
        
        />
      ))}
    </div>
  )
}

export default CurrenciesList
