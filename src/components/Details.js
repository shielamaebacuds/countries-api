import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import styles from "./Details.module.css";
import Button from "./Button";
import Error from "./Error";

function Details() {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);
  const [error, setError] = useState(false);

  let nativeName = "";
  let currency = [];
  let languages = [];

  //when border country is clicked, it will
  //change the country name in the link, not stack up
  const navigate = useNavigate();

  useEffect(
    function () {
      const controller = new AbortController();

      setBorders(() => []);
      async function fetchCountryDetails() {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            setError(true);
            throw new Error("Country not found!!!");
          }

          const data = await res.json();
          setCountry(() => data[0]);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log("Error: ", err);
          }
        }
      }
      fetchCountryDetails();

      return function () {
        controller.abort();
      };
    },
    [name]
  );

  //get the object key corresponding to the language
  const languageKey = country?.languages ? Object.keys(country.languages) : "";

  if (languageKey) {
    nativeName = country?.name.nativeName[languageKey[0]]?.official;
    languages = languageKey?.map((key) => country?.languages[key]).join(", ");
  }

  const currencyKey = country?.currencies
    ? Object.keys(country.currencies)
    : "";

  if (currencyKey) {
    currency.name = country?.currencies[currencyKey]?.name;
    currency.symbol = country?.currencies[currencyKey]?.symbol;
  }

  //to avoid infinite re-renders
  // as we use this variable in the useEffect hook
  const borderCountries = useMemo(
    function () {
      return country.borders || [];
    },
    [country?.borders]
  );

  useEffect(
    function () {
      if (!country?.borders) return;

      borderCountries?.map((code) => {
        const controller = new AbortController();

        async function getBorders() {
          try {
            const res = await fetch(
              `https://restcountries.com/v3.1/alpha/${code}?fields=name`,
              { signal: controller.signal }
            );
            if (!res.ok) {
              throw new Error("Border not found");
            }
            const data = await res.json();
            setBorders((borders) => [...borders, data.name.common]);
          } catch (err) {
            if (err.name !== "AbortError") {
              console.log("Error : ", err);
            }
          }
        }
        getBorders();

        return function () {
          controller.abort();
        };
      });
    },
    [country, borderCountries]
  );

  if (error) return <Error type={"unknownCountry"} />;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={country.flags?.svg} alt={`Flag of ${name}`} />
        </div>
      </div>
      <div className={styles.container}>
        <h2 className={styles.countryName}>{name}</h2>
        <div className={styles.mainInfoContainer}>
          <div>
            <span>
              <span className={styles.infoSubtitle}>Native name: </span>
              {nativeName}
            </span>
            <span>
              <span className={styles.infoSubtitle}>Population: </span>
              {country.population?.toLocaleString()}
            </span>
            <span>
              <span className={styles.infoSubtitle}>Region: </span>
              {country.region}
            </span>
            <span>
              <span className={styles.infoSubtitle}>Sub Region: </span>
              {country.subregion}
            </span>
            <span>
              <span className={styles.infoSubtitle}>Capital: </span>
              {country.capital}
            </span>
          </div>
          <div>
            <span>
              <span className={styles.infoSubtitle}>Top Level Domain: </span>
              {country.tld}
            </span>
            <span>
              <span className={styles.infoSubtitle}>Currencies: </span>
              {currency.name} ({currency.symbol})
            </span>
            <span>
              <span className={styles.infoSubtitle}>Languages: </span>
              {languages}
            </span>
          </div>
        </div>
        <div className={styles.borderCountriesContainer}>
          <span>
            <strong>Border Countries: </strong>
          </span>
          <ul className={styles.borderBtnsContainer}>
            {borders.length > 0
              ? borders.map((country, index) => (
                  <li key={country}>
                    <Button
                      onclick={() => {
                        navigate(`/${country}`);
                      }}
                      content={country}
                    />
                  </li>
                ))
              : "none"}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Details;
