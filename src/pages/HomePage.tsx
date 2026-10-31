import Nav from '../components/site/Nav';
import Hero from '../components/site/Hero';
import Services from '../components/site/Services';
import Work from '../components/site/Work';
import Process from '../components/site/Process';
import About from '../components/site/About';
import Faq from '../components/site/Faq';
import Contact from '../components/site/Contact';
import Footer from '../components/site/Footer';
import WhatsAppFab from '../components/site/WhatsAppFab';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
