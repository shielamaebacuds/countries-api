import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(function () {
    const currentTheme = localStorage.getItem("theme");
    return currentTheme ? JSON.parse(currentTheme) : "Dark";
  });

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(
    function () {
      const body = document.querySelector("body");
      body.setAttribute("data-theme", `${theme}`);
    },
    [theme]
  );

  function handleInput(inputValue) {
    setKeyword(() => inputValue);
  }

  function handleFilter(choice) {
    setFilter(() => choice);
  }

  return (
    <div className="App">
      <Header currentTheme={theme} onSetTheme={setTheme} />
      <Search>
        <SearchInput keyword={keyword} onInput={handleInput} />
        <Filter filter={filter} onChangeFilter={handleFilter} />
      </Search>
      <Flags keyword={keyword} filter={filter} />
    </div>
  );
}

function Flags({ keyword, filter }) {
  const [data, setData] = useState([]);

  //fetch data from API
  useEffect(
    function () {
      //for cancelling unneeded pending http requests
      const controller = new AbortController();

      async function fetchData() {
        try {
          const res = await fetch(
            keyword
              ? `https://restcountries.com/v3.1/name/${keyword}`
              : `https://restcountries.com/v3.1/all `,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok) throw new Error("There was an error fetching the data");

          const data = await res.json();
          if (data.Response === "false") throw new Error("Country not found.");

          if (filter) {
            const filteredData = data.filter(
              (country) => country.region === filter
            );
            setData(() => filteredData);
          } else {
            setData(() => data);
          }
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
      <section className="container">
        <div className="count-container"> Results ({data.length})</div>
        <div className="flags-grid">
          {data?.map((country, index) => (
            <Flag country={country} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

function Flag({ country }) {
  const { name, population, region, capital, flags } = country;

  return (
    <div className="card">
      <div className="card-img-container">
        <img className="card-country-img" src={flags.png} alt="flagpic"></img>
      </div>
      <div className="card-desc-container">
        <h3>{name.common}</h3>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
      </div>
    </div>
  );
}

function Header({ currentTheme, onSetTheme }) {
  function handleClick() {
    onSetTheme((prev) => (prev === "Light" ? "Dark" : "Light"));

    //store theme to localStorage
    localStorage.setItem(
      "theme",
      JSON.stringify(currentTheme === "Light" ? "Dark" : "Light")
    );
  }

  return (
    <header>
      <div>
        <h3>Where in the world?</h3>
        <button className="theme-btn" onClick={handleClick}>
          {currentTheme === "Light" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1458514 5 5 8.1458514 5 12 C 5 15.854149 8.1458514 19 12 19 C 15.854149 19 19 15.854149 19 12 C 19 8.1458514 15.854149 5 12 5 z M 12 7 C 14.773268 7 17 9.2267316 17 12 C 17 14.773268 14.773268 17 12 17 C 9.2267316 17 7 14.773268 7 12 C 7 9.2267316 9.2267316 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z" />
            </svg>
          )}

          {currentTheme === "Dark" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
            </svg>
          )}

          <span>{currentTheme} Mode</span>
        </button>
      </div>
    </header>
  );
}

function Search({ children }) {
  return <div className="search-container">{children}</div>;
}

function SearchInput({ keyword, onInput }) {
  return (
    <div className="search-input-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="20px"
        height="20px"
      >
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
      </svg>
      <input
        type="text"
        value={keyword}
        onChange={(e) => onInput(e.target.value)}
        placeholder="Search for a country..."
      ></input>
    </div>
  );
}

function Filter({ filter, onChangeFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState("false");

  function handleFilterClick(region) {
    onChangeFilter(region);
    setIsFilterOpen((prev) => !prev);
  }

  return (
    <div className="filter-container">
      <div
        className="filter-choice"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <span>{filter ? filter : "Filter by Region"}</span>
        <svg
          className={`${isFilterOpen ? "arrow-up" : "arrow-down"} `}
          height="20px"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
        </svg>
      </div>

      {isFilterOpen && (
        <div className="filter-options">
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
export default App;
