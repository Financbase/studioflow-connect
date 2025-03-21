
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
    ru: "Центр Поддержки",
    pt: "Centro de Suporte",
    ar: "مركز الدعم"
  }),
  "support.subtitle": ensureAllLanguages({
    en: "How can we help you today?",
    es: "¿Cómo podemos ayudarte hoy?",
    fr: "Comment pouvons-nous vous aider aujourd'hui?",
    de: "Wie können wir Ihnen heute helfen?",
    sv: "Hur kan vi hjälpa dig idag?",
    ja: "本日はどのようにお手伝いできますか？",
    zh: "今天我们能为您做些什么？",
    ru: "Как мы можем помочь вам сегодня?",
    pt: "Como podemos ajudá-lo hoje?",
    ar: "كيف يمكننا مساعدتك اليوم؟"
  }),
  "support.tickets": ensureAllLanguages({
    en: "Tickets",
    es: "Tickets",
    fr: "Tickets",
    de: "Tickets",
    sv: "Ärenden",
    ja: "チケット",
    zh: "工单",
    ru: "Тикеты",
    pt: "Tickets",
    ar: "التذاكر"
  }),
  "support.notifications": ensureAllLanguages({
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Notiser",
    ja: "通知",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  }),
  "support.faq": ensureAllLanguages({
    en: "FAQ",
    es: "Preguntas Frecuentes",
    fr: "FAQ",
    de: "FAQ",
    sv: "Vanliga Frågor",
    ja: "よくある質問",
    zh: "常见问题",
    ru: "ЧЗВ",
    pt: "FAQ",
    ar: "الأسئلة الشائعة"
  }),
  "support.contact": ensureAllLanguages({
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
  }),
  "support.search_placeholder": ensureAllLanguages({
    en: "Search for help...",
    es: "Buscar ayuda...",
    fr: "Rechercher de l'aide...",
    de: "Nach Hilfe suchen...",
    sv: "Sök efter hjälp...",
    ja: "ヘルプを検索...",
    zh: "搜索帮助...",
    ru: "Искать помощь...",
    pt: "Procurar ajuda...",
    ar: "البحث عن مساعدة..."
  }),
  "support.new_ticket": ensureAllLanguages({
    en: "New Ticket",
    es: "Nuevo Ticket",
    fr: "Nouveau Ticket",
    de: "Neues Ticket",
    sv: "Nytt Ärende",
    ja: "新規チケット",
    zh: "新工单",
    ru: "Новый Тикет",
    pt: "Novo Ticket",
    ar: "تذكرة جديدة"
  }),
  "support.live_chat": ensureAllLanguages({
    en: "Live Chat",
    es: "Chat en Vivo",
    fr: "Chat en Direct",
    de: "Live-Chat",
    sv: "Live-chatt",
    ja: "ライブチャット",
    zh: "在线聊天",
    ru: "Живой Чат",
    pt: "Chat ao Vivo",
    ar: "الدردشة المباشرة"
  }),
  "support.recently_searched": ensureAllLanguages({
    en: "Recently Searched",
    es: "Búsquedas Recientes",
    fr: "Recherches Récentes",
    de: "Kürzlich Gesucht",
    sv: "Nyligen Sökt",
    ja: "最近の検索",
    zh: "最近搜索",
    ru: "Недавно Искали",
    pt: "Pesquisas Recentes",
    ar: "تم البحث مؤخرًا"
  }),
  "support.recently_viewed": ensureAllLanguages({
    en: "Recently Viewed",
    es: "Vistos Recientemente",
    fr: "Récemment Consultés",
    de: "Kürzlich Angesehen",
    sv: "Nyligen Visade",
    ja: "最近表示したもの",
    zh: "最近查看",
    ru: "Недавно Просмотренные",
    pt: "Visualizações Recentes",
    ar: "شوهدت مؤخرًا"
  }),
  "support.related_topics": ensureAllLanguages({
    en: "Related Topics",
    es: "Temas Relacionados",
    fr: "Sujets Connexes",
    de: "Verwandte Themen",
    sv: "Relaterade Ämnen",
    ja: "関連トピック",
    zh: "相关主题",
    ru: "Связанные Темы",
    pt: "Tópicos Relacionados",
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
  }),
  "support.validation_error": ensureAllLanguages({
    en: "Validation Error",
    es: "Error de Validación",
    fr: "Erreur de Validation",
    de: "Validierungsfehler",
    sv: "Valideringsfel",
    ja: "検証エラー",
    zh: "验证错误",
    ru: "Ошибка Валидации",
    pt: "Erro de Validação",
    ar: "خطأ في التحقق"
  }),
  "support.provide_title_description": ensureAllLanguages({
    en: "Please provide both a title and description",
    es: "Por favor proporciona un título y descripción",
    fr: "Veuillez fournir un titre et une description",
    de: "Bitte geben Sie einen Titel und eine Beschreibung an",
    sv: "Vänligen ange både titel och beskrivning",
    ja: "タイトルと説明の両方を入力してください",
    zh: "请提供标题和描述",
    ru: "Пожалуйста, укажите заголовок и описание",
    pt: "Por favor, forneça um título e uma descrição",
    ar: "يرجى تقديم العنوان والوصف"
  }),
  "support.ticket_created": ensureAllLanguages({
    en: "Ticket Created",
    es: "Ticket Creado",
    fr: "Ticket Créé",
    de: "Ticket Erstellt",
    sv: "Ärende Skapat",
    ja: "チケットが作成されました",
    zh: "工单已创建",
    ru: "Тикет Создан",
    pt: "Ticket Criado",
    ar: "تم إنشاء التذكرة"
  }),
  "support.ticket_submitted": ensureAllLanguages({
    en: "Your support ticket has been submitted",
    es: "Tu ticket de soporte ha sido enviado",
    fr: "Votre ticket de support a été soumis",
    de: "Ihr Support-Ticket wurde eingereicht",
    sv: "Ditt supportärende har skickats in",
    ja: "サポートチケットが送信されました",
    zh: "您的支持工单已提交",
    ru: "Ваш тикет в службу поддержки отправлен",
    pt: "Seu ticket de suporte foi enviado",
    ar: "تم تقديم تذكرة الدعم الخاصة بك"
  }),
  "support.message_sent": ensureAllLanguages({
    en: "Message Sent",
    es: "Mensaje Enviado",
    fr: "Message Envoyé",
    de: "Nachricht Gesendet",
    sv: "Meddelande Skickat",
    ja: "メッセージが送信されました",
    zh: "消息已发送",
    ru: "Сообщение Отправлено",
    pt: "Mensagem Enviada",
    ar: "تم إرسال الرسالة"
  }),
  "support.agent_respond": ensureAllLanguages({
    en: "A support agent will respond shortly",
    es: "Un agente de soporte responderá en breve",
    fr: "Un agent de support vous répondra sous peu",
    de: "Ein Support-Mitarbeiter wird in Kürze antworten",
    sv: "En supportagent svarar snart",
    ja: "サポート担当者がまもなく対応します",
    zh: "支持人员将很快回复",
    ru: "Специалист службы поддержки ответит в ближайшее время",
    pt: "Um agente de suporte responderá em breve",
    ar: "سيرد عليك وكيل الدعم قريبًا"
  })
};

export default supportTranslations;
