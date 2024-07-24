import styles from './Search.module.css'

function Search({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Search;
