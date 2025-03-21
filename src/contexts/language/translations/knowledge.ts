
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const knowledgeBaseTranslations: Record<string, Record<Language, string>> = {
  "kb.title": ensureAllLanguages({
    en: "Knowledge Base",
    es: "Base de Conocimiento",
    fr: "Base de Connaissances",
    de: "Wissensdatenbank",
    sv: "Kunskapsbank",
    ja: "ナレッジベース",
    zh: "知识库",
    ru: "База знаний",
    pt: "Base de Conhecimento",
    ar: "قاعدة المعرفة"
  }),
  "kb.guides": ensureAllLanguages({
    en: "Guides and frequently asked questions",
    es: "Guías y preguntas frecuentes",
    fr: "Guides et questions fréquentes",
    de: "Anleitungen und häufig gestellte Fragen",
    sv: "Guider och vanliga frågor",
    ja: "ガイドとよくある質問",
    zh: "指南和常见问题",
    ru: "Руководства и часто задаваемые вопросы",
    pt: "Guias e perguntas frequentes",
    ar: "الأدلة والأسئلة الشائعة"
  }),
  "kb.search": ensureAllLanguages({
    en: "Search for answers...",
    es: "Buscar respuestas...",
    fr: "Rechercher des réponses...",
    de: "Nach Antworten suchen...",
    sv: "Sök efter svar...",
    ja: "回答を検索...",
    zh: "搜索答案...",
    ru: "Поиск ответов...",
    pt: "Procurar respostas...",
    ar: "البحث عن إجابات..."
  }),
  "kb.no_results": ensureAllLanguages({
    en: "No results found for",
    es: "No se encontraron resultados para",
    fr: "Aucun résultat trouvé pour",
    de: "Keine Ergebnisse gefunden für",
    sv: "Inga resultat hittades för",
    ja: "次の検索に結果がありません",
    zh: "没有找到相关结果",
    ru: "Результатов не найдено для",
    pt: "Nenhum resultado encontrado para",
    ar: "لم يتم العثور على نتائج لـ"
  }),
  "kb.clear_search": ensureAllLanguages({
    en: "Clear Search",
    es: "Borrar Búsqueda",
    fr: "Effacer la Recherche",
    de: "Suche Löschen",
    sv: "Rensa Sökning",
    ja: "検索をクリア",
    zh: "清除搜索",
    ru: "Очистить Поиск",
    pt: "Limpar Pesquisa",
    ar: "مسح البحث"
  }),
  "kb.results_found": ensureAllLanguages({
    en: "results found",
    es: "resultados encontrados",
    fr: "résultats trouvés",
    de: "Ergebnisse gefunden",
    sv: "resultat hittade",
    ja: "件の結果",
    zh: "找到结果",
    ru: "найдено результатов",
    pt: "resultados encontrados",
    ar: "نتائج وجدت"
  }),
  "kb.view_all": ensureAllLanguages({
    en: "View All",
    es: "Ver Todo",
    fr: "Voir Tout",
    de: "Alle Anzeigen",
    sv: "Visa Alla",
    ja: "すべて表示",
    zh: "查看全部",
    ru: "Просмотреть Все",
    pt: "Ver Tudo",
    ar: "عرض الكل"
  }),
  "kb.music_production": ensureAllLanguages({
    en: "Music Production",
    es: "Producción Musical",
    fr: "Production Musicale",
    de: "Musikproduktion",
    sv: "Musikproduktion",
    ja: "音楽制作",
    zh: "音乐制作",
    ru: "Музыкальное Производство",
    pt: "Produção Musical",
    ar: "إنتاج الموسيقى"
  }),
  "kb.expert_tips": ensureAllLanguages({
    en: "Expert tips and techniques",
    es: "Consejos y técnicas de expertos",
    fr: "Conseils et techniques d'experts",
    de: "Expertentipps und Techniken",
    sv: "Experttips och tekniker",
    ja: "専門家のヒントとテクニック",
    zh: "专家提示和技巧",
    ru: "Советы и методы экспертов",
    pt: "Dicas e técnicas de especialistas",
    ar: "نصائح وتقنيات الخبراء"
  })
};

export default knowledgeBaseTranslations;
