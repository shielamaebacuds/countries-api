import { useNavigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Button from "./components/Button";
import Details from "./components/Details";

function DetailsPage({ theme, setTheme }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header currentTheme={theme} onSetTheme={setTheme} />

      <Button
        onclick={() => {
          navigate(-1);
        }}
        symbol="&larr;"
        content={"Back"}
      />
      <Details />
    </div>
  );
}

export default DetailsPage;
