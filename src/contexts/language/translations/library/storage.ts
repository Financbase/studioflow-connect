
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const storageTranslations: Record<string, Record<Language, string>> = {
  "library.storagePanel.title": ensureAllLanguages({
    en: "Storage",
    es: "Almacenamiento",
    fr: "Stockage",
    de: "Speicher",
    sv: "Lagring",
    ja: "ストレージ",
    zh: "存储",
    ru: "Хранилище",
    pt: "Armazenamento",
    ar: "التخزين"
  }),
  "library.storagePanel.used": ensureAllLanguages({
    en: "Used",
    es: "Usado",
    fr: "Utilisé",
    de: "Verwendet",
    sv: "Använt",
    ja: "使用中",
    zh: "已使用",
    ru: "Использовано",
    pt: "Usado",
    ar: "مستخدم"
  }),
  "library.storagePanel.free": ensureAllLanguages({
    en: "Free",
    es: "Libre",
    fr: "Libre",
    de: "Frei",
    sv: "Ledigt",
    ja: "空き",
    zh: "可用",
    ru: "Свободно",
    pt: "Livre",
    ar: "متاح"
  }),
  "library.storagePanel.upgrade": ensureAllLanguages({
    en: "Upgrade Storage",
    es: "Actualizar Almacenamiento",
    fr: "Augmenter le Stockage",
    de: "Speicher Erweitern",
    sv: "Uppgradera Lagring",
    ja: "ストレージをアップグレード",
    zh: "升级存储",
    ru: "Расширить хранилище",
    pt: "Aumentar Armazenamento",
    ar: "ترقية التخزين"
  })
};

export default storageTranslations;
