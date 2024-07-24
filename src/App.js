import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import DetailsPage from "./DetailsPage";
import Error from "./components/Error";

function App() {
  const [theme, setTheme] = useState(function () {
    const currentTheme = localStorage.getItem("theme");
    return currentTheme ? JSON.parse(currentTheme) : "Dark";
  });
  useEffect(
    function () {
      const body = document.querySelector("body");
      body.setAttribute("data-theme", `${theme}`);
    },
    [theme]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Homepage theme={theme} setTheme={setTheme} />}
        ></Route>
        <Route
          path="/:name"
          element={<DetailsPage theme={theme} setTheme={setTheme} />}
        ></Route>
        <Route path="*" element={<Error type={"undefinedPath"}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
