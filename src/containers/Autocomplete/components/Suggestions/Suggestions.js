import PropTypes from "prop-types";
import styles from "./Suggestions.module.scss";
import { createRef, forwardRef } from "react";

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
