import { useIsMobileApp } from '../../hooks/useMediaQuery';

const MobileScreenGate = ({ mobile, desktop }) => {
  const isMobile = useIsMobileApp();
  return isMobile ? mobile : desktop;
};

export default MobileScreenGate;
