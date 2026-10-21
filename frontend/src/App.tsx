import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteSettings, ServiceItem, GalleryItem } from './types';
import { fetchSettings, fetchServices, fetchGallery, fallbackSettings } from './api';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DispatchAgent } from './components/DispatchAgent';

import { ComingSoon } from './pages/ComingSoon';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Shipyards } from './pages/Shipyards';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './admin/AdminDashboard';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetchSettings().then(setSettings);
    fetchServices().then(setServices);
    fetchGallery().then(setGallery);
  }, []);

  // Toggle this flag or use ?preview=full to preview the full multi-page site
  const isComingSoon = true;
  const showFullSite = typeof window !== 'undefined' && window.location.search.includes('preview=full');

  if (isComingSoon && !showFullSite) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/*"
            element={
              <>
                <ComingSoon settings={settings} />
                <DispatchAgent settings={settings} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route - Shop Office */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Website Routes */}
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header settings={settings} />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home settings={settings} services={services} gallery={gallery} />} />
                  <Route path="/about" element={<About settings={settings} />} />
                  <Route path="/services" element={<Services services={services} />} />
                  <Route path="/shipyards" element={<Shipyards settings={settings} />} />
                  <Route path="/gallery" element={<Gallery gallery={gallery} />} />
                  <Route path="/contact" element={<Contact settings={settings} services={services} />} />
                </Routes>
              </main>
              <Footer settings={settings} />
              <ScrollToTop />
              <DispatchAgent settings={settings} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
