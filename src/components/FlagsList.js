import { useState, useEffect } from "react";
import styles from "./FlagsList.module.css";
import Flag from "./Flag";

function Flags({ keyword, filter }) {
  const [data, setData] = useState([]);

  //fetch data from API
  useEffect(
    function () {
      //for cancelling unneeded pending http requests
      const controller = new AbortController();

      async function fetchData() {
        try {
          const res = await fetch(`https://restcountries.com/v3.1/all `, {
            signal: controller.signal,
          });

          if (!res.ok) throw new Error("There was an error fetching the data");

          const data = await res.json();
          if (data.Response === "false") throw new Error("Country not found.");

          let filteredData = data.filter((country) =>
            keyword
              ? country.name.common
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              : country != null
          );

          filteredData = filteredData.filter((country) =>
            filter ? country.region === filter : country
          );
          setData(() => filteredData);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err);
          }
        }
      }

      fetchData();

      return function () {
        controller.abort();
      };
    },
    [keyword, filter]
  );

  return (
    <>
      <section className={styles.container}>
        <div className={styles.countContainer}> Results ({data.length})</div>
        <div className={styles.grid}>
          {data?.map((country, index) => (
            <Flag country={country} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}



export default Flags;
