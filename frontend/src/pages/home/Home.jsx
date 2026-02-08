import styles from './home.module.css'
import CurrenciesList from '../../widgets/CurrenciesList/CurrenciesList'
import logo from '../../../public/logo.svg'
import { useState } from 'react'
import { useCurrency } from '../../../hooks/useCurrency'
import Loader from '../../shared/ui/Loader/Loader'
import update from '../../../public/update.svg'
import { useSync } from '../../../hooks/useSync'

function Home({updated_at}) {
  const { data, isLoading: isCurrenciesLoading, error } = useCurrency()
  const { mutate: sync, isPending: isSyncLoading } = useSync()


  const [input, setInput] = useState('')

  const filteredData =  data?.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase()))

  
  function parseDate(str) {
    const [datePart, timePart] = str.split(', ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  function getMaxUpdatedAt(data = {}) {
    let maxDateObj = null;
    let maxRawString = null;

    for (const item of data) {
      const d = parseDate(item.updated_at);

      if (!maxDateObj || d > maxDateObj) {
        maxDateObj = d;
        maxRawString = item.updated_at;
      }
    }

    return maxRawString;
  }
  
  return (
    <main className={styles.home}>
        <div className={styles.home_header}>
            <img src={logo} alt="" />
            <h1>CourseSync</h1>
            <h3>Курсы валют в реальном времени по отношению к Рублю</h3>
            <div className={styles.sync}>
            <p>Обновлено: {isCurrenciesLoading || error ? "" : getMaxUpdatedAt(data)}</p> <button className={styles.update_button} onClick={() => sync()}><img src={update} alt="" className={isSyncLoading ? styles.rotate_button : ''}/></button>
            </div>
            <p>Источник: www.cbr.ru</p>
        </div>
        <input type="text" className={styles.input} placeholder='Поиск...' onChange={(e) => setInput(e.target.value)}/>
        {error ? <div>Ошибка API</div> : <>
          {isCurrenciesLoading || isSyncLoading ? <Loader /> : <> 
          {filteredData[0] ? <CurrenciesList data={filteredData}/> : <p>Ничего не найдено</p>}
          </>}
        </>}
        <p>Нажмите на любую валюту, чтобы просмотреть подробные графики и исторические данные.</p>
            <p>Developed by <a href="https://github.com/andrfh">antheri</a></p>

    </main>
  )
}

export default Home
