import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

export default function RouteProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return null;
}