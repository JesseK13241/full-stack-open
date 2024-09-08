import { useState, useEffect } from 'react';

const Notify = ({ errorMessage }: {errorMessage: string}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer); 
    } else { return }
  }, [errorMessage]);

  if (!visible) return null;

  return (
    <div style={styles.notification}>
      {errorMessage}
    </div>
  );
};

const styles = {
  notification: {
    color: "red",
  },
};

export default Notify;
