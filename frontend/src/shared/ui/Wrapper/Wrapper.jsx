import styles from './Wrapper.module.css'
import Loader from '../Loader/Loader'

function Wrapper({children, isLoading, data, error}) {
  return (
    <div className={styles.wrapper}>
        {error ? <>Ошибка API</> : (data && !isLoading ? children : <Loader />)}
    </div>
  )
}

export default Wrapper
