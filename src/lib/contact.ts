export const WHATSAPP_NUMBER = '254795981487';
export const WHATSAPP_DISPLAY = '0795 981 487';
export const EMAIL = 'hello@jkay.my.id';
export const whatsappLink = (text = "Hi Joblo Web, I'd like a quote for a website.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
