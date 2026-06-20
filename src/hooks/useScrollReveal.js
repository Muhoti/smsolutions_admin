import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (options = {}) =>
  useInView({
    triggerOnce: true,
    threshold: 0.1,
    ...options,
  });
