import { Input } from "./components/Input";
import { Suggestions } from "./components/Suggestions";
import styles from "./Autocomplete.container.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import FetchData from "../../services/suggestions.service";

/**
 *
 * Autocomplete container:
 * A component which contains all the business logic
 * @return {JSX.Element}
 */
const AutocompleteContainer = () => {
  const [therm, setTerm] = useState("");
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  // Set the therm every time the input component send a change event
  const onChange = useCallback(
    (searchedTherm) => {
      setTerm(searchedTherm);
      setVisible(true);
    },
    [therm]
  );

  // Set the therm when the user clicks on a list item
  const onClick = useCallback(
    (searchedTherm) => {
      setTerm(searchedTherm);
      setVisible(false);
    },
    [therm]
  );

  // Perform a search every time the user write something
  useEffect(() => {
    if (therm) {
      const fetchData = async () => {
        const data = await FetchData(therm);
        return data.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      };

      fetchData()
        .then((resultsList) => setList(resultsList))
        .catch((e) => {
          console.error(e);
          setList([]);
        });
    } else setList([]);
  }, [therm]);

  // Memoized component which contains the suggestions list
  const SuggestionsComponent = useMemo(() => {
    return (
      <Suggestions suggestions={list} onClick={onClick} visible={visible} />
    );
  }, [list]);

  return (
    <div className={styles.autocompleteContainer}>
      <Input onChange={onChange} value={therm} />
      {SuggestionsComponent}
    </div>
  );
};

export { AutocompleteContainer };
