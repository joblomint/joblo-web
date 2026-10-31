import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../lib/contact';

export default function WhatsAppFab() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-xl transition hover:scale-105">
      <MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
