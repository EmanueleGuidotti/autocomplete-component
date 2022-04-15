import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({ onKeyUp, value }) => {
  return (
    <input
      className={styles.input}
      type="text"
      onChange={(e) => onKeyUp(e.target.value)}
      value={value}
    />
  );
};

Input.propTypes = {
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
};

export { Input };
