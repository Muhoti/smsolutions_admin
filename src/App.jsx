import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import AppHeader from './components/mobile/AppHeader';
import BottomNav from './components/BottomNav';
import MobilePageLayout from './components/mobile/MobilePageLayout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import './App.css';
import './styles/ai-background.css';
import './styles/responsive.css';
import './styles/mobile-flutter-shell.css';
import './styles/mobile-app.css';
import './components/mobile/flutter/MobileCinematicHero.css';
import './components/mobile/flutter/MobileUIKit.css';
/* After MobileUIKit — contact form contrast overrides must win the cascade */
import './components/mobile/screens/MobileContactScreen.css';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <AppHeader />}

      <main className={`site-main${isAdminRoute ? ' site-main--admin' : ''}`}>
        <Routes>
          <Route element={<MobilePageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BottomNav />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0d1628',
            color: '#fff',
            borderRadius: '14px',
            fontSize: '0.9rem',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AppShell />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
