import type { Dictionary } from "./en";

/** First draft of the interface text in Spanish. A native speaker should check it (milestone 10). */
const es: Dictionary = {
  skipToContent: "Saltar al contenido",
  homeLabel: "FORM ibiza, inicio",
  menu: { open: "Menú", close: "Cerrar", title: "Menú" },
  languageNav: "Idioma",
  languageNames: { en: "English", es: "Español" },
  nav: {
    home: "Inicio",
    sales: "Ventas",
    rentals: "Alquileres",
    developers: "Promotores",
    about: "Nosotros",
    contact: "Contacto",
  },
  menuExtras: { privateOffice: "La Oficina Privada", instagram: "Instagram" },
  footer: {
    label: "Pie de página",
    newsletterLabel: "Suscríbase a nuestra newsletter",
    newsletterPlaceholder: "Su correo electrónico",
    newsletterButton: "Unirme a la lista",
    newsletterNotice: "Solo correos ocasionales. Puede darse de baja en cualquier momento.",
    newsletterSoon: "La suscripción se abrirá pronto. Mientras tanto, escríbanos.",
    privacy: "Privacidad",
    cookies: "Cookies",
    legalNotice: "Aviso legal",
    whatsapp: "WhatsApp",
    whatsappSoon: "[NÚMERO DE WHATSAPP PENDIENTE]",
  },
  placeholder: {
    body: "Esta página se construye en un hito posterior. Esta vista previa muestra la cabecera, el menú, el pie de página y el cambio de idioma.",
    titles: {
      home: "Inicio",
      sales: "Ventas",
      rentals: "Alquileres",
      developers: "Promotores",
      about: "Nosotros",
      sell: "Venda con nosotros",
      contact: "Contacto",
      privateOffice: "La Oficina Privada",
      privacy: "Privacidad",
      cookies: "Cookies",
      legalNotice: "Aviso legal",
    },
  },
  notFound: { title: "Página no encontrada", body: "La página que busca no está aquí.", link: "Volver al inicio" },
  meta: {
    description:
      "FORM | ibiza es una asesoría inmobiliaria independiente que representa a propietarios particulares, family offices, promotores y arquitectos, con énfasis en la discreción, la transparencia y el conocimiento del mercado.",
  },
};

export default es;
