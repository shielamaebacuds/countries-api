import styles from "./Button.module.css";

function Button({ onclick, symbol, content }) {
  return (
    <div className={styles.backBtnContainer}>
      <button className={styles.button} onClick={onclick}>
        {symbol} {content}
      </button>
    </div>
  );
}

export default Button;
