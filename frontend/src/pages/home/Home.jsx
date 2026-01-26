import styles from './home.module.css'
import CurrenciesList from '../../widgets/CurrenciesList/CurrenciesList'
import data from '../../../data'
import logo from '../../../public/logo.svg'
import { useState } from 'react'

function Home({updated_at}) {
  const [input, setInput] = useState('')

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <main className={styles.home}>
        <div className={styles.home_header}>
            <img src={logo} alt="" />
            <h1>CourseSync</h1>
            <h3>Курсы валют в реальном времени по отношению к Рублю</h3>
            <p>Обновлено: {updated_at}</p>
            <p>Источник: www.cbr.ru</p>
        </div>
        <input type="text" className={styles.input} placeholder='Поиск...' onChange={(e) => setInput(e.target.value)}/>
        {filteredData[0] ? <CurrenciesList data={filteredData}/> : <p>Ничего не найдено</p>}
        <p>Нажмите на любую валюту, чтобы просмотреть подробные графики и исторические данные.</p>
            <p>Developed by <a href="https://github.com/andrfh">antheri</a></p>

    </main>
  )
}

export default Home
