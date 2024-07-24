import { Link } from "react-router-dom";
import styles from "./Flag.module.css";

function Flag({ country }) {
  const { name, population, region, capital, flags } = country;

  return (
    <Link to={`/${name.common}`}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img
            className={styles.countryImg}
            src={flags.png}
            alt="flagpic"
          ></img>
        </div>
        <div className={styles.descContainer}>
          <h3>{name.common}</h3>
          <p><strong>Population:</strong> {population.toLocaleString()}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Capital:</strong> {capital}</p>
        </div>
      </div>
    </Link>
  );
}
export default Flag;
