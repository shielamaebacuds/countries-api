import { useNavigate, useParams } from "react-router-dom";
import styles from "./Error.module.css";
import Button from "./Button";

function Error({ type }) {
  const country = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorMessage}>
        <h1>Sorry 😞</h1>
        {type === "unknownCountry" && (
          <p>
            we couldn't find the country "{country.name}" . Please check if
            you've entered the correct URL or try searching for another country.
          </p>
        )}
        {type === "undefinedPath" && (
          <div>
            <p>
              Page Not Found. Please check if you've entered the correct URL
            </p>
            <Button content={"Back to home"} onclick={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Error;
