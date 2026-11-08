import { useState } from 'react';

export function useCrud(entityName) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return { loading, setLoading, error, setError, notification, showNotification, entityName };
}