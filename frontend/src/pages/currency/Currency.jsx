import styles from './Currency.module.css'
import arrow from '../../../public/arrow.svg'
import Wrapper from '../../shared/ui/Wrapper/Wrapper'
import InfoBlock from '../../widgets/InfoBlock/InfoBlock'
import date from '../../../public/date.svg'
import Graph from '../../widgets/Graph/Graph'
import { useParams } from 'react-router-dom';
import { useRate } from '../../../hooks/useRate'
import { useEffect, useState } from 'react'
import { useDynamic } from '../../../hooks/useDynamic'
import getDateRange from '../../../utils/date'
import RangeButton from '../../shared/ui/RangeButton/RangeButton'
import getMinMaxValue from '../../../utils/minmax'
import Loader from '../../shared/ui/Loader/Loader'

function Currency() {
  // ID from url
  let { id } = useParams();

  // ranges
  const ranges = [
    { label: '1 неделя', value: '1w' },
    { label: '1 месяц', value: '1m' },
    { label: '3 месяца', value: '3m' },
    { label: '6 месяцев', value: '6m' },
    { label: '1 год', value: '1y' },
  ];

  const { from, to } = getDateRange(ranges[0].value);

  const [rangeStatus, setRangeStatus] = useState(ranges[0])

  // dates
  const [date1, setDate1] = useState(from);
  const [date2, setDate2] = useState(to);

  // changes
  const [change, setChange] = useState()

  // minmax

  const [minmax, setMinmax] = useState({
        minRate: '',
        maxRate: ''
      })

  // API fetches 
  const {data: currency, isLoading: isCurrencyLoading, error: currencyError} = useRate(id)

  const { data, isLoading: isDynamicLoading, error: dynamicError } = useDynamic(
    id,
    date1,
    date2
  );

  // functions 
  const getRange = (index) => {
    const { from, to } = getDateRange(ranges[index].value);
    setDate1(from)
    setDate2(to)
    setRangeStatus(ranges[index])
    
  }

  const getChange = (rates) => {
    let firstRate = parseFloat(rates[0].value.replace(',', '.'))
    let lastRate = parseFloat(rates[rates.length - 1].value.replace(',', '.'))

    let change = (lastRate - firstRate) / firstRate * 100
    return change.toFixed(2)
  }

  useEffect(()=> {
    if (data) {
      setChange(getChange(data.Records))
    }
  }, [data])

  
  return (
    <div className={styles.main}>
      <a href="/" className={styles.back_link}><img src={arrow} alt="" />Вернуться на главную</a>
      <Wrapper isLoading={isCurrencyLoading} data={currency} error={currencyError}>
        <div className={styles.info_top}>
          <div className={styles.currency}>
            <img src={`https://flagcdn.com/80x60/${currency?.code.slice(0, -1).toLowerCase()}.png`} alt="" />
            <div className={styles.currency_text}>
              <h2>{currency?.code}</h2>
              <p>{currency?.name}</p>
            </div>
          </div>
          <span className={styles.change} style={{backgroundColor: change <= 0 ? '#dc070720' :'#00A63E20', color: change <= 0 ? '#dc0707' :'#00A63E'}}>
              {change > 0 ? 

              // green arrow
              <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.24833 18.75C1.55217 18.7496 1.84545 18.6385 2.07333 18.4375L12.4983 9.2125L15.4108 12.1375C15.527 12.2547 15.6653 12.3477 15.8176 12.4111C15.9699 12.4746 16.1333 12.5072 16.2983 12.5072C16.4633 12.5072 16.6267 12.4746 16.779 12.4111C16.9314 12.3477 17.0696 12.2547 17.1858 12.1375L24.9983 4.2625V7.5C24.9983 7.83152 25.13 8.14946 25.3644 8.38388C25.5989 8.6183 25.9168 8.75 26.2483 8.75C26.5798 8.75 26.8978 8.6183 27.1322 8.38388C27.3666 8.14946 27.4983 7.83152 27.4983 7.5V1.25C27.4983 0.918479 27.3666 0.600537 27.1322 0.366117C26.8978 0.131696 26.5798 0 26.2483 0H19.9983C19.6668 0 19.3489 0.131696 19.1144 0.366117C18.88 0.600537 18.7483 0.918479 18.7483 1.25C18.7483 1.58152 18.88 1.89946 19.1144 2.13388C19.3489 2.3683 19.6668 2.5 19.9983 2.5H23.2358L16.2483 9.4875L13.3858 6.6125C13.154 6.39453 12.8478 6.27318 12.5296 6.27318C12.2114 6.27318 11.9052 6.39453 11.6733 6.6125L0.423326 16.6125C0.174966 16.8315 0.0236325 17.14 0.00254084 17.4705C-0.0185509 17.8009 0.0923225 18.1262 0.310826 18.375C0.432421 18.4993 0.578602 18.5968 0.740027 18.6614C0.901453 18.7259 1.07457 18.7561 1.24833 18.75Z" fill={change <= 0 ? '#dc0707' :'#00A63E'}/>
              </svg>  
              
              :
              // red arrow
              <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.2257 0.000746727C1.52404 0.00116645 1.812 0.107809 2.03575 0.300734L12.2718 9.15637L15.1315 6.34848C15.2456 6.23602 15.3814 6.14674 15.531 6.08582C15.6805 6.0249 15.8409 5.99354 16.003 5.99354C16.165 5.99354 16.3254 6.0249 16.475 6.08582C16.6245 6.14674 16.7603 6.23602 16.8744 6.34848L24.5453 13.9082V10.8003C24.5453 10.4821 24.6746 10.1768 24.9048 9.95181C25.135 9.72677 25.4471 9.60035 25.7727 9.60035C26.0982 9.60035 26.4103 9.72677 26.6405 9.95181C26.8707 10.1768 27 10.4821 27 10.8003V16.8C27 17.1183 26.8707 17.4235 26.6405 17.6485C26.4103 17.8736 26.0982 18 25.7727 18H19.6359C19.3104 18 18.9982 17.8736 18.768 17.6485C18.5379 17.4235 18.4086 17.1183 18.4086 16.8C18.4086 16.4818 18.5379 16.1766 18.768 15.9516C18.9982 15.7265 19.3104 15.6001 19.6359 15.6001H22.8147L15.9539 8.89238L13.1432 11.6523C12.9156 11.8615 12.6149 11.978 12.3025 11.978C11.9901 11.978 11.6894 11.8615 11.4618 11.6523L0.415655 2.05266C0.171795 1.84245 0.0232043 1.54624 0.0024948 1.22903C-0.0182147 0.911828 0.0906494 0.599546 0.305193 0.360731C0.424584 0.241439 0.568116 0.14781 0.726617 0.0858254C0.885117 0.0238405 1.0551 -0.00513624 1.2257 0.000746727Z" fill={change <= 0 ? '#dc0707' :'#00A63E'}/>
              </svg>
              
              
              }
              {change  + '%'}
          </span>
        </div>
        <div className={styles.blocks_wrapper}>
          <InfoBlock color="#155DFC" text="Текущая цена" value={currency?.value + ' ₽'} subtitle={`Номинал ${currency?.nominal + currency?.symbol}`} />
          <InfoBlock color="#00A63E" text={`${rangeStatus.label}`} value={getMinMaxValue(data?.Records)?.max ? getMinMaxValue(data?.Records)?.max  + ' ₽' : ""} subtitle="Максимальная цена"/>
          <InfoBlock color="#9841FB" text={`${rangeStatus.label}`} value={getMinMaxValue(data?.Records)?.min ? getMinMaxValue(data?.Records)?.min  + ' ₽' : ""} subtitle="Минимальная цена"/>
        </div>
      </Wrapper>
      <Wrapper isLoading={isDynamicLoading} data={data} error={dynamicError}>
        <h2 className={styles.title}><img src={date} alt="" /> Данные за период</h2>
        <div className={styles.range_buttons}>
          {ranges.map((item, index) => (
            <RangeButton text={item.label} isActive={item.value == rangeStatus.value} onClick={() => {getRange(index)}}/>
          ))}
        </div>
        <Graph rawData={data?.Records}/>
      </Wrapper>
      <p>Источник: www.cbr.ru</p>
      <p>Developed by <a href="https://github.com/andrfh">antheri</a></p>
    </div>
  )
}

export default Currency
