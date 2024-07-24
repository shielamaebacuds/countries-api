import React, { useState } from "react";
import FlagsList from "./components/FlagsList";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import Filter from "./components/Filter";
import Search from "./components/Search";
import "./App.css";

function Homepage({ theme, setTheme }) {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");

  function handleInput(inputValue) {
    setKeyword(() => inputValue);
  }

  function handleFilter(choice) {
    setFilter(() => choice);
  }

  return (
    <div className={"App"}>
      <Header currentTheme={theme} onSetTheme={setTheme} />
      <Search>
        <SearchInput keyword={keyword} onInput={handleInput} />
        <Filter filter={filter} onChangeFilter={handleFilter} />
      </Search>
      <FlagsList keyword={keyword} filter={filter} />
    </div>
  );
}

export default Homepage;
