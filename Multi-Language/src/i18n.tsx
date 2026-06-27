import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: {
      translation: {
        bienvenido: "Bienvenido",
      },
    },
    en: {
      translation: {
        bienvenido: "Welcome",
      },
    },
    pt: {
      translation: {
        bienvenido: "Bem-vindo",
      },
    },
  },
});

export default i18n;
