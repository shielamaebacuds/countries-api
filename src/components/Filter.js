import { useState } from "react";
import styles from './Filter.module.css'


function Filter({ filter, onChangeFilter }) {
    const [isFilterOpen, setIsFilterOpen] = useState("false");
  
    function handleFilterClick(region) {
      onChangeFilter(region);
      setIsFilterOpen((prev) => !prev);
    }
  
    return (
      <div className={styles.filterContainer}>
        <div
          className={styles.filterChoice}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <span>{filter ? filter : "Filter by Region"}</span>
          <svg
            className={`${isFilterOpen ? styles.arrowUp : styles.arrowDown} `}
            height="20px"
            viewBox="0 0 1792 1792"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
          </svg>
        </div>
  
        {isFilterOpen && (
          <div className={styles.filterOptions}>
            <span onClick={() => handleFilterClick("Africa")}>Africa</span>
            <span onClick={() => handleFilterClick("Americas")}>America</span>
            <span onClick={() => handleFilterClick("Asia")}>Asia</span>
            <span onClick={() => handleFilterClick("Europe")}>Europe</span>
            <span onClick={() => handleFilterClick("Oceania")}>Oceania</span>
            <span onClick={() => handleFilterClick("")}>No Filter</span>
          </div>
        )}
      </div>
    );
  }

export default Filter;