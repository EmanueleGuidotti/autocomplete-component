import PropTypes from "prop-types";
import styles from "./Input.module.scss";

/**
 *
 * Input component:
 * It render an input component
 * @param onChange - function to handle changes
 * @param value - the value provided by the user
 * @return {JSX.Element}
 */
const Input = ({ onChange, value, defaultValue }) => {
  return (
    <input
      className={styles.input}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value || defaultValue}
    />
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
};

export { Input };
