import PropTypes from "prop-types"
import { useState, useEffect } from 'react';

const Notify = ({ errorMessage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  if (!visible) return null;

  return (
    <div style={styles.notification}>
      {errorMessage}
    </div>
  );
};

Notify.propTypes = {
  errorMessage: PropTypes.string
}

const styles = {
  notification: {
    border: "1px solid red",
    padding: "10 px"
  },
};

export default Notify;
