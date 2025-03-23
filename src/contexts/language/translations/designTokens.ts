
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const designTokensTranslations: Record<string, Record<Language, string>> = {
  "design.tokens.title": ensureAllLanguages({
    en: "Design Tokens",
    es: "Tokens de Diseño",
    fr: "Jetons de Design",
    de: "Design-Tokens",
    sv: "Designtokens",
    ja: "デザイントークン",
    zh: "设计令牌",
    ru: "Дизайн-токены",
    pt: "Tokens de Design",
    ar: "رموز التصميم"
  }),
  "design.tokens.description": ensureAllLanguages({
    en: "Explore and customize your design system tokens",
    es: "Explora y personaliza los tokens de tu sistema de diseño",
    fr: "Explorez et personnalisez les jetons de votre système de design",
    de: "Erkunden und passen Sie Ihre Design-System-Tokens an",
    sv: "Utforska och anpassa dina design system-tokens",
    ja: "デザインシステムトークンを探索してカスタマイズする",
    zh: "探索和自定义您的设计系统令牌",
    ru: "Исследуйте и настройте токены вашей системы дизайна",
    pt: "Explore e personalize os tokens do seu sistema de design",
    ar: "استكشف وتخصيص رموز نظام التصميم الخاص بك"
  }),
  "design.tokens.search": ensureAllLanguages({
    en: "Search tokens...",
    es: "Buscar tokens...",
    fr: "Rechercher des jetons...",
    de: "Tokens suchen...",
    sv: "Sök tokens...",
    ja: "トークンを検索...",
    zh: "搜索令牌...",
    ru: "Поиск токенов...",
    pt: "Pesquisar tokens...",
    ar: "البحث عن الرموز..."
  }),
  "design.tokens.show_values": ensureAllLanguages({
    en: "Show Values",
    es: "Mostrar Valores",
    fr: "Afficher les Valeurs",
    de: "Werte Anzeigen",
    sv: "Visa Värden",
    ja: "値を表示",
    zh: "显示值",
    ru: "Показать Значения",
    pt: "Mostrar Valores",
    ar: "عرض القيم"
  }),
  "design.tokens.tip.title": ensureAllLanguages({
    en: "Design Token Usage",
    es: "Uso de Tokens de Diseño",
    fr: "Utilisation des Jetons de Design",
    de: "Verwendung von Design-Tokens",
    sv: "Användning av Designtokens",
    ja: "デザイントークンの使用法",
    zh: "设计令牌使用",
    ru: "Использование Дизайн-токенов",
    pt: "Uso de Tokens de Design",
    ar: "استخدام رموز التصميم"
  }),
  "design.tokens.tip.description": ensureAllLanguages({
    en: "Use these tokens in your CSS to maintain design consistency",
    es: "Usa estos tokens en tu CSS para mantener la consistencia del diseño",
    fr: "Utilisez ces jetons dans votre CSS pour maintenir la cohérence du design",
    de: "Verwenden Sie diese Tokens in Ihrem CSS, um die Designkonsistenz zu erhalten",
    sv: "Använd dessa tokens i din CSS för att bibehålla designkonsistens",
    ja: "デザインの一貫性を維持するために、これらのトークンをCSSで使用してください",
    zh: "在CSS中使用这些令牌以保持设计一致性",
    ru: "Используйте эти токены в вашем CSS для поддержания согласованности дизайна",
    pt: "Use estes tokens em seu CSS para manter a consistência do design",
    ar: "استخدم هذه الرموز في CSS الخاص بك للحفاظ على اتساق التصميم"
  }),
  "design.tokens.tab.colors": ensureAllLanguages({
    en: "Colors",
    es: "Colores",
    fr: "Couleurs",
    de: "Farben",
    sv: "Färger",
    ja: "色",
    zh: "颜色",
    ru: "Цвета",
    pt: "Cores",
    ar: "الألوان"
  }),
  "design.tokens.tab.spacing": ensureAllLanguages({
    en: "Spacing",
    es: "Espaciado",
    fr: "Espacement",
    de: "Abstände",
    sv: "Mellanrum",
    ja: "間隔",
    zh: "间距",
    ru: "Отступы",
    pt: "Espaçamento",
    ar: "المسافات"
  }),
  "design.tokens.tab.typography": ensureAllLanguages({
    en: "Typography",
    es: "Tipografía",
    fr: "Typographie",
    de: "Typografie",
    sv: "Typografi",
    ja: "タイポグラフィ",
    zh: "排版",
    ru: "Типографика",
    pt: "Tipografia",
    ar: "الطباعة"
  }),
  "design.tokens.tab.other": ensureAllLanguages({
    en: "Other",
    es: "Otros",
    fr: "Autres",
    de: "Andere",
    sv: "Annat",
    ja: "その他",
    zh: "其他",
    ru: "Другое",
    pt: "Outros",
    ar: "أخرى"
  }),
  "design.tokens.total": ensureAllLanguages({
    en: "Total",
    es: "Total",
    fr: "Total",
    de: "Gesamt",
    sv: "Totalt",
    ja: "合計",
    zh: "总计",
    ru: "Всего",
    pt: "Total",
    ar: "المجموع"
  }),
  "design.tokens.colors": ensureAllLanguages({
    en: "Colors",
    es: "Colores",
    fr: "Couleurs",
    de: "Farben",
    sv: "Färger",
    ja: "色",
    zh: "颜色",
    ru: "Цвета",
    pt: "Cores",
    ar: "الألوان"
  }),
  "design.tokens.spacing": ensureAllLanguages({
    en: "Spacing",
    es: "Espaciado",
    fr: "Espacement",
    de: "Abstände",
    sv: "Mellanrum",
    ja: "間隔",
    zh: "间距",
    ru: "Отступы",
    pt: "Espaçamento",
    ar: "المسافات"
  }),
  "design.tokens.typography": ensureAllLanguages({
    en: "Typography",
    es: "Tipografía",
    fr: "Typographie",
    de: "Typografie",
    sv: "Typografi",
    ja: "タイポグラフィ",
    zh: "排版",
    ru: "Типографика",
    pt: "Tipografia",
    ar: "الطباعة"
  }),
  "design.tokens.other": ensureAllLanguages({
    en: "Other",
    es: "Otros",
    fr: "Autres",
    de: "Andere",
    sv: "Annat",
    ja: "その他",
    zh: "其他",
    ru: "Другое",
    pt: "Outros",
    ar: "أخرى"
  })
};

export default designTokensTranslations;
