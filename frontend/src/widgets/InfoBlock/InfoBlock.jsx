import styles from './InfoBlock.module.css'

function InfoBlock({data, color, text, value, subtitle}) {
  return (
    <div className={styles.block} style={{backgroundColor: color + "20"}}>
      <span style={{color: color}}>{text}</span>
      <h3>{value}</h3>
      <p>{subtitle}</p>
    </div>
  )
}

export default InfoBlock
