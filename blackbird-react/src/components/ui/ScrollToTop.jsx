import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const section = document.getElementById(hash.slice(1));
    section?.scrollIntoView({ block: 'start' });
  }, [pathname, hash]);

  return null;
}
