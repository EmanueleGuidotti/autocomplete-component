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
  const [value, setValue] = useState("");

  // Set the therm every time the input component send a change event
  const onChange = useCallback(
    (searchedTherm) => {
      setTerm(searchedTherm);
      setValue("");
    },
    [therm]
  );

  // Set the therm when the user clicks on a list item
  const onClick = useCallback(
    (searchedTherm) => {
      setTerm("");
      setValue(searchedTherm);
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
    return <Suggestions suggestions={list} onClick={onClick} value={value} />;
  }, [list]);

  return (
    <div className={styles.autocompleteContainer}>
      <Input onChange={onChange} value={therm} defaultValue={value} />
      {SuggestionsComponent}
    </div>
  );
};

export { AutocompleteContainer };
