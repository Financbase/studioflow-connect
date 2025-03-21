
import { Language } from "../types";
import { processTranslations } from "../utils";

const footerTranslations = {
  "footer.terms": {
    en: "Terms",
    es: "Términos",
    fr: "Conditions",
    de: "Bedingungen",
    sv: "Villkor",
    ja: "利用規約",
    zh: "条款",
    ru: "Условия",
    pt: "Termos",
    ar: "الشروط"
  },
  "footer.privacy": {
    en: "Privacy",
    es: "Privacidad",
    fr: "Confidentialité",
    de: "Datenschutz",
    sv: "Integritet",
    ja: "プライバシー",
    zh: "隐私",
    ru: "Конфиденциальность",
    pt: "Privacidade",
    ar: "الخصوصية"
  },
  "footer.contact": {
    en: "Contact",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    sv: "Kontakt",
    ja: "お問い合わせ",
    zh: "联系我们",
    ru: "Контакты",
    pt: "Contato",
    ar: "اتصل بنا"
  },
  "footer.copyright": {
    en: "© 2024 StudioFlow X. All rights reserved.",
    es: "© 2024 StudioFlow X. Todos los derechos reservados.",
    fr: "© 2024 StudioFlow X. Tous droits réservés.",
    de: "© 2024 StudioFlow X. Alle Rechte vorbehalten.",
    sv: "© 2024 StudioFlow X. Alla rättigheter förbehållna.",
    ja: "© 2024 StudioFlow X. All rights reserved.",
    zh: "© 2024 StudioFlow X. 保留所有权利。",
    ru: "© 2024 StudioFlow X. Все права защищены.",
    pt: "© 2024 StudioFlow X. Todos os direitos reservados.",
    ar: "© 2024 StudioFlow X. جميع الحقوق محفوظة."
  }
};

export default processTranslations(footerTranslations);
