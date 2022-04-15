import PropTypes from "prop-types";
import styles from "./Suggestions.module.scss";
import { createRef, forwardRef } from "react";

/**
 * Suggestion element:
 * A component which render a single suggestion line
 * @param id - the item id
 * @param title - the item name
 * @param onClick - function to handle click events
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly onClick?: *, readonly id?: *, readonly title?: *}> & React.RefAttributes<unknown>>}
 * @return {JSX.Element}
 */
const SuggestionElement = forwardRef(({ id, title, onClick }, ref) => (
  <div
    ref={ref}
    className={styles.suggestion}
    key={id}
    onClick={() => onClick(title)}
  >
    {title}
  </div>
));

SuggestionElement.displayName = "SuggestionElement";
SuggestionElement.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

/**
 *
 * Suggestions component:
 * It render a list of suggestions
 * @param suggestions - an array of suggestions
 * @param className - an additional class
 * @param onClick - function to handle click event
 * @param visible - a boolean value to hide/show the list
 * @return {JSX.Element}
 */
const Suggestions = ({ suggestions, className, onClick, visible }) => {
  return (
    <div
      className={[
        styles.suggestionsContainer,
        className,
        visible ? styles.visible : styles.invisible,
      ].join(" ")}
    >
      {suggestions?.length > 0 &&
        suggestions.map((suggestion) => {
          const ref = createRef();
          return (
            <SuggestionElement
              ref={ref}
              key={suggestion.id}
              onClick={() => {
                onClick(ref.current.outerText);
              }}
              {...suggestion}
            />
          );
        })}
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export { Suggestions };
