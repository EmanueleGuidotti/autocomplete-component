import { Input } from "./components/Input";
import { Suggestions } from "./components/Suggestions";
import styles from "./Autocomplete.container.module.scss";
import { useEffect, useMemo, useState } from "react";
import FetchData from "../../services/suggestions.service";

const AutocompleteContainer = () => {
  const [therm, setTerm] = useState("");
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  const onKeyUp = (searchedTherm) => {
    setTerm(searchedTherm);
    setVisible(true);
  };

  const onClick = (searchedTherm) => {
    setTerm(searchedTherm);
    setVisible(false);
  };

  useEffect(() => {
    if (therm) {
      const fetchData = async () => {
        const data = await FetchData(therm);
        return data;
      };

      fetchData()
        .then((resultsList) => setList(resultsList))
        .catch(console.error);
    } else setList([]);
  }, [therm]);

  const SuggestionsComponent = useMemo(() => {
    return (
      <Suggestions suggestions={list} onClick={onClick} visible={visible} />
    );
  }, [list]);

  return (
    <div className={styles.autocompleteContainer}>
      <Input onKeyUp={onKeyUp} value={therm} />
      {SuggestionsComponent}
    </div>
  );
};

export { AutocompleteContainer };
