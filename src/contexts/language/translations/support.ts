
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const supportTranslations: Record<string, Record<Language, string>> = {
  "support.title": ensureAllLanguages({
    en: "Support Center",
    es: "Centro de Soporte",
    fr: "Centre d'Assistance",
    de: "Support-Center",
    sv: "Supportcenter",
    ja: "サポートセンター",
    zh: "支持中心",
    ru: "Центр поддержки",
    pt: "Central de Suporte",
    ar: "مركز الدعم"
  }),
  "support.subtitle": ensureAllLanguages({
    en: "Get help with our products and services",
    es: "Obtenga ayuda con nuestros productos y servicios",
    fr: "Obtenez de l'aide pour nos produits et services",
    de: "Erhalten Sie Hilfe zu unseren Produkten und Dienstleistungen",
    sv: "Få hjälp med våra produkter och tjänster",
    ja: "当社の製品やサービスに関するヘルプを入手する",
    zh: "获取我们的产品和服务的帮助",
    ru: "Получите помощь по нашим продуктам и услугам",
    pt: "Obtenha ajuda com nossos produtos e serviços",
    ar: "الحصول على مساعدة بشأن منتجاتنا وخدماتنا"
  }),
  "support.search": ensureAllLanguages({
    en: "Search for help...",
    es: "Buscar ayuda...",
    fr: "Rechercher de l'aide...",
    de: "Nach Hilfe suchen...",
    sv: "Sök efter hjälp...",
    ja: "ヘルプを検索...",
    zh: "搜索帮助...",
    ru: "Поиск помощи...",
    pt: "Procurar ajuda...",
    ar: "البحث عن المساعدة..."
  }),
  "support.categories": ensureAllLanguages({
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
  }),
  "support.contact": ensureAllLanguages({
    en: "Contact Us",
    es: "Contáctenos",
    fr: "Contactez-nous",
    de: "Kontaktieren Sie uns",
    sv: "Kontakta oss",
    ja: "お問い合わせ",
    zh: "联系我们",
    ru: "Свяжитесь с нами",
    pt: "Contate-nos",
    ar: "اتصل بنا"
  }),
  "support.livechat": ensureAllLanguages({
    en: "Live Chat",
    es: "Chat en vivo",
    fr: "Chat en direct",
    de: "Live-Chat",
    sv: "Live-chatt",
    ja: "ライブチャット",
    zh: "在线聊天",
    ru: "Живой чат",
    pt: "Chat ao vivo",
    ar: "دردشة مباشرة"
  }),
  "support.createticket": ensureAllLanguages({
    en: "Create Ticket",
    es: "Crear Ticket",
    fr: "Créer un Ticket",
    de: "Ticket erstellen",
    sv: "Skapa ärende",
    ja: "チケットを作成",
    zh: "创建工单",
    ru: "Создать тикет",
    pt: "Criar Ticket",
    ar: "إنشاء تذكرة"
  }),
  "support.tickets": ensureAllLanguages({
    en: "My Tickets",
    es: "Mis Tickets",
    fr: "Mes Tickets",
    de: "Meine Tickets",
    sv: "Mina ärenden",
    ja: "マイチケット",
    zh: "我的工单",
    ru: "Мои тикеты",
    pt: "Meus Tickets",
    ar: "تذاكري"
  }),
  "support.faq": ensureAllLanguages({
    en: "FAQs",
    es: "Preguntas frecuentes",
    fr: "FAQs",
    de: "Häufig gestellte Fragen",
    sv: "Vanliga frågor",
    ja: "よくある質問",
    zh: "常见问题",
    ru: "Часто задаваемые вопросы",
    pt: "Perguntas frequentes",
    ar: "الأسئلة الشائعة"
  }),
  "support.recently_searched": ensureAllLanguages({
    en: "Recently Searched",
    es: "Búsquedas recientes",
    fr: "Recherches récentes",
    de: "Kürzlich gesucht",
    sv: "Nyligen sökt",
    ja: "最近の検索",
    zh: "最近搜索",
    ru: "Недавно искали",
    pt: "Pesquisas recentes",
    ar: "البحث الأخير"
  }),
  "support.recently_viewed": ensureAllLanguages({
    en: "Recently Viewed",
    es: "Vistas recientemente",
    fr: "Vus récemment",
    de: "Kürzlich angesehen",
    sv: "Nyligen visade",
    ja: "最近表示",
    zh: "最近查看",
    ru: "Недавно просмотренные",
    pt: "Visualizados recentemente",
    ar: "شوهدت مؤخرا"
  }),
  "support.related_topics": ensureAllLanguages({
    en: "Related Topics",
    es: "Temas relacionados",
    fr: "Sujets connexes",
    de: "Verwandte Themen",
    sv: "Relaterade ämnen",
    ja: "関連トピック",
    zh: "相关主题",
    ru: "Похожие темы",
    pt: "Tópicos relacionados",
    ar: "مواضيع ذات صلة"
  }),
  "support.no_tickets": ensureAllLanguages({
    en: "You don't have any tickets yet",
    es: "Aún no tienes tickets",
    fr: "Vous n'avez pas encore de tickets",
    de: "Sie haben noch keine Tickets",
    sv: "Du har inga ärenden än",
    ja: "チケットはまだありません",
    zh: "您还没有工单",
    ru: "У вас еще нет тикетов",
    pt: "Você ainda não tem tickets",
    ar: "ليس لديك أي تذاكر حتى الآن"
  })
};

export default supportTranslations;
