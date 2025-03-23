
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const documentationTranslations: Record<string, Record<Language, string>> = {
  "docs.title": ensureAllLanguages({
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation",
    ja: "ドキュメンテーション",
    zh: "文档",
    ru: "Документация",
    pt: "Documentação",
    ar: "التوثيق"
  }),
  "docs.subtitle": ensureAllLanguages({
    en: "Explore guides, API references, and examples to help you get the most out of StudioFlow",
    es: "Explora guías, referencias de API y ejemplos para aprovechar al máximo StudioFlow",
    fr: "Explorez les guides, les références d'API et les exemples pour tirer le meilleur parti de StudioFlow",
    de: "Entdecken Sie Anleitungen, API-Referenzen und Beispiele, die Ihnen helfen, das Beste aus StudioFlow herauszuholen",
    sv: "Utforska guider, API-referenser och exempel för att hjälpa dig att få ut det mesta av StudioFlow",
    ja: "StudioFlowを最大限に活用するためのガイド、APIリファレンス、例を探索する",
    zh: "探索指南、API参考和示例，帮助您充分利用StudioFlow",
    ru: "Исследуйте руководства, справочники по API и примеры, чтобы получить максимальную отдачу от StudioFlow",
    pt: "Explore guias, referências de API e exemplos para ajudá-lo a aproveitar ao máximo o StudioFlow",
    ar: "استكشف الأدلة ومراجع واجهة برمجة التطبيقات والأمثلة لمساعدتك في الاستفادة القصوى من StudioFlow"
  }),
  "docs.tabs.guides": ensureAllLanguages({
    en: "Guides",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    sv: "Guider",
    ja: "ガイド",
    zh: "指南",
    ru: "Руководства",
    pt: "Guias",
    ar: "الأدلة"
  }),
  "docs.tabs.api": ensureAllLanguages({
    en: "API Reference",
    es: "Referencia de API",
    fr: "Référence de l'API",
    de: "API-Referenz",
    sv: "API-referens",
    ja: "APIリファレンス",
    zh: "API参考",
    ru: "Справочник по API",
    pt: "Referência da API",
    ar: "مرجع واجهة برمجة التطبيقات"
  }),
  "docs.tabs.examples": ensureAllLanguages({
    en: "Examples",
    es: "Ejemplos",
    fr: "Exemples",
    de: "Beispiele",
    sv: "Exempel",
    ja: "例",
    zh: "示例",
    ru: "Примеры",
    pt: "Exemplos",
    ar: "أمثلة"
  }),
  "docs.getStarted": ensureAllLanguages({
    en: "Get Started",
    es: "Comenzar",
    fr: "Commencer",
    de: "Erste Schritte",
    sv: "Kom igång",
    ja: "はじめに",
    zh: "开始使用",
    ru: "Начало работы",
    pt: "Começar",
    ar: "ابدأ"
  }),
  "docs.search": ensureAllLanguages({
    en: "Search documentation...",
    es: "Buscar documentación...",
    fr: "Rechercher dans la documentation...",
    de: "Dokumentation durchsuchen...",
    sv: "Sök i dokumentationen...",
    ja: "ドキュメントを検索...",
    zh: "搜索文档...",
    ru: "Поиск по документации...",
    pt: "Pesquisar documentação...",
    ar: "البحث في التوثيق..."
  }),
  "docs.popular": ensureAllLanguages({
    en: "Popular Topics",
    es: "Temas Populares",
    fr: "Sujets Populaires",
    de: "Beliebte Themen",
    sv: "Populära Ämnen",
    ja: "人気のトピック",
    zh: "热门主题",
    ru: "Популярные темы",
    pt: "Tópicos Populares",
    ar: "المواضيع الشائعة"
  }),
  "docs.categories": ensureAllLanguages({
    en: "Categories",
    es: "Categorías",
    fr: "Catégories",
    de: "Kategorien",
    sv: "Kategorier",
    ja: "カテゴリー",
    zh: "类别",
    ru: "Категории",
    pt: "Categorias",
    ar: "الفئات"
  })
};

export default documentationTranslations;
