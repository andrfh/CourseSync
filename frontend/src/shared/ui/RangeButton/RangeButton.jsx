import styles from './RangeButton.module.css'

function RangeButton({text, isActive, onClick}) {
    
    return (
        <button className={isActive ? styles["active"] : styles["button"] } isActive onClick={onClick}>{text}</button>
    )
}

export default RangeButton;