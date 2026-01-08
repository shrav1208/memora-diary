import { useEffect } from 'react';

export const useBodyClass = (className) => {
  useEffect(() => {
    document.body.className = className;
  }, [className]);
};