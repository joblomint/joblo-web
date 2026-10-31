import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@project/components/ui/sonner';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function Seo() {
  useEffect(() => {
    document.title = 'Joblo Web — Web Designer in Kenya | Websites from KSh 10,000';
    const set = (attr: string, key: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const desc = 'Fast, mobile-friendly websites for Kenyan businesses. One-page sites from KSh 10,000, live in under a week. Get a free quote on WhatsApp.';
    set('name', 'description', desc);
    set('property', 'og:title', 'Joblo Web — Websites that work');
    set('property', 'og:description', desc);
    set('property', 'og:type', 'website');
    set('name', 'twitter:card', 'summary');
    if (!document.head.querySelector('link[rel="icon"]')) {
      const l = document.createElement('link');
      l.rel = 'icon';
      l.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23145c40'/><text x='50%' y='54%' font-family='Arial' font-weight='800' font-size='36' fill='%23f6a823' text-anchor='middle' dominant-baseline='middle'>J</text></svg>";
      document.head.appendChild(l);
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Seo />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
