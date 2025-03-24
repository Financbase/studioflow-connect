
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
    en: "Get help with your StudioFlow issues and access our knowledge resources",
    es: "Obtén ayuda con tus problemas de StudioFlow y accede a nuestros recursos de conocimiento",
    fr: "Obtenez de l'aide pour vos problèmes StudioFlow et accédez à nos ressources de connaissances",
    de: "Erhalten Sie Hilfe bei Ihren StudioFlow-Problemen und greifen Sie auf unsere Wissensressourcen zu",
    sv: "Få hjälp med dina StudioFlow-problem och få tillgång till våra kunskapsresurser",
    ja: "StudioFlowの問題に関するヘルプやナレッジリソースにアクセス",
    zh: "获取StudioFlow问题的帮助并访问我们的知识资源",
    ru: "Получите помощь с проблемами StudioFlow и доступ к нашим ресурсам знаний",
    pt: "Obtenha ajuda com seus problemas do StudioFlow e acesse nossos recursos de conhecimento",
    ar: "احصل على مساعدة بشأن مشكلات StudioFlow الخاصة بك والوصول إلى موارد المعرفة لدينا"
  }),
  "support.new_ticket": ensureAllLanguages({
    en: "New Support Ticket",
    es: "Nuevo Ticket de Soporte",
    fr: "Nouveau Ticket de Support",
    de: "Neues Support-Ticket",
    sv: "Nytt supportärende",
    ja: "新しいサポートチケット",
    zh: "新支持工单",
    ru: "Новый тикет поддержки",
    pt: "Novo Ticket de Suporte",
    ar: "تذكرة دعم جديدة"
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
    sv: "FAQ",
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
  "support.no_tickets": ensureAllLanguages({
    en: "No tickets found",
    es: "No se encontraron tickets",
    fr: "Aucun ticket trouvé",
    de: "Keine Tickets gefunden",
    sv: "Inga ärenden hittades",
    ja: "チケットが見つかりません",
    zh: "未找到工单",
    ru: "Тикеты не найдены",
    pt: "Nenhum ticket encontrado",
    ar: "لم يتم العثور على تذاكر"
  }),
  "support.validation_error": ensureAllLanguages({
    en: "Validation Error",
    es: "Error de Validación",
    fr: "Erreur de Validation",
    de: "Validierungsfehler",
    sv: "Valideringsfel",
    ja: "バリデーションエラー",
    zh: "验证错误",
    ru: "Ошибка проверки",
    pt: "Erro de Validação",
    ar: "خطأ في التحقق"
  }),
  "support.provide_title_description": ensureAllLanguages({
    en: "Please provide both title and description",
    es: "Por favor proporciona tanto el título como la descripción",
    fr: "Veuillez fournir le titre et la description",
    de: "Bitte geben Sie Titel und Beschreibung an",
    sv: "Vänligen ange både titel och beskrivning",
    ja: "タイトルと説明の両方を入力してください",
    zh: "请提供标题和描述",
    ru: "Пожалуйста, укажите название и описание",
    pt: "Por favor, forneça título e descrição",
    ar: "يرجى تقديم كل من العنوان والوصف"
  }),
  "support.ticket_created": ensureAllLanguages({
    en: "Ticket Created",
    es: "Ticket Creado",
    fr: "Ticket Créé",
    de: "Ticket Erstellt",
    sv: "Ärende Skapat",
    ja: "チケット作成完了",
    zh: "工单已创建",
    ru: "Тикет создан",
    pt: "Ticket Criado",
    ar: "تم إنشاء التذكرة"
  }),
  "support.ticket_submitted": ensureAllLanguages({
    en: "Your support ticket has been submitted successfully",
    es: "Tu ticket de soporte ha sido enviado con éxito",
    fr: "Votre ticket de support a été soumis avec succès",
    de: "Ihr Support-Ticket wurde erfolgreich übermittelt",
    sv: "Ditt supportärende har skickats in",
    ja: "サポートチケットは正常に送信されました",
    zh: "您的支持工单已成功提交",
    ru: "Ваш тикет поддержки успешно отправлен",
    pt: "Seu ticket de suporte foi enviado com sucesso",
    ar: "تم تقديم تذكرة الدعم الخاصة بك بنجاح"
  }),
  "support.message_sent": ensureAllLanguages({
    en: "Message Sent",
    es: "Mensaje Enviado",
    fr: "Message Envoyé",
    de: "Nachricht Gesendet",
    sv: "Meddelande Skickat",
    ja: "メッセージ送信完了",
    zh: "消息已发送",
    ru: "Сообщение отправлено",
    pt: "Mensagem Enviada",
    ar: "تم إرسال الرسالة"
  }),
  "support.agent_respond": ensureAllLanguages({
    en: "A support agent will respond shortly",
    es: "Un agente de soporte responderá en breve",
    fr: "Un agent de support répondra sous peu",
    de: "Ein Support-Mitarbeiter wird in Kürze antworten",
    sv: "En supportagent kommer att svara inom kort",
    ja: "サポート担当者がまもなく対応します",
    zh: "支持人员将很快回复",
    ru: "Агент поддержки ответит в ближайшее время",
    pt: "Um agente de suporte responderá em breve",
    ar: "سيرد وكيل الدعم قريبًا"
  })
};

export default supportTranslations;
