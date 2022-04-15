import styles from "./App.module.scss";
import { AutocompleteContainer } from "../containers/Autocomplete";

const App = () => {
  return (
    <div className={styles.App}>
      <AutocompleteContainer />
    </div>
  );
};

export { App };
