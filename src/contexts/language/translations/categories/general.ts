import { Language } from "../../types";
import { processTranslations } from "../../utils";

// UI labels for language selection
const generalTranslations = {
  "label.language": {
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    sv: "Språk",
    ja: "言語",
    zh: "语言",
    ru: "Язык",
    pt: "Idioma",
    ar: "اللغة"
  },
  "label.dashboardview": {
    en: "View",
    es: "Vista",
    fr: "Affichage",
    de: "Ansicht",
    sv: "Vy",
    ja: "表示",
    zh: "视图",
    ru: "Вид",
    pt: "Visualização",
    ar: "عرض"
  },
  // Notification translations
  "notifications.title": {
    en: "Notifications",
    es: "Notificaciones",
    fr: "Notifications",
    de: "Benachrichtigungen",
    sv: "Aviseringar",
    ja: "お知らせ",
    zh: "通知",
    ru: "Уведомления",
    pt: "Notificações",
    ar: "الإشعارات"
  },
  "notifications.mark_all_read": {
    en: "Mark all as read",
    es: "Marcar todos como leídos",
    fr: "Marquer tout comme lu",
    de: "Alle als gelesen markieren",
    sv: "Markera alla som lästa",
    ja: "すべて既読にする",
    zh: "标记所有为已读",
    ru: "Отметить все как прочитанное",
    pt: "Marcar tudo como lido",
    ar: "تعليم الكل كمقروء"
  },
  "notifications.all": {
    en: "All",
    es: "Todos",
    fr: "Tout",
    de: "Alle",
    sv: "Alla",
    ja: "すべて",
    zh: "全部",
    ru: "Все",
    pt: "Todos",
    ar: "الكل"
  },
  "notifications.unread": {
    en: "Unread",
    es: "No leídos",
    fr: "Non lu",
    de: "Ungelesen",
    sv: "Olästa",
    ja: "未読",
    zh: "未读",
    ru: "Непрочитанные",
    pt: "Não lidos",
    ar: "غير مقروء"
  },
  "notifications.empty": {
    en: "No notifications to display",
    es: "No hay notificaciones para mostrar",
    fr: "Aucune notification à afficher",
    de: "Keine Benachrichtigungen zum Anzeigen",
    sv: "Inga aviseringar att visa",
    ja: "表示する通知はありません",
    zh: "没有通知显示",
    ru: "Нет уведомлений для отображения",
    pt: "Nenhuma notificação para exibir",
    ar: "لا توجد إشعارات للعرض"
  },
  // Recent activity translations
  "activity.recentActivity": {
    en: "Recent Activity",
    es: "Actividad Reciente",
    fr: "Activité Récente",
    de: "Neueste Aktivitäten",
    sv: "Senaste Aktivitet",
    ja: "最近のアクティビティ",
    zh: "最近活动",
    ru: "Недавняя активность",
    pt: "Atividade Recente",
    ar: "النشاط الأخير"
  },
  "activity.latestActions": {
    en: "Your latest actions and updates",
    es: "Tus últimas acciones y actualizaciones",
    fr: "Vos dernières actions et mises à jour",
    de: "Ihre neuesten Aktionen und Updates",
    sv: "Dina senaste åtgärder och uppdateringar",
    ja: "最新のアクションと更新",
    zh: "您的最新操作和更新",
    ru: "Ваши последние действия и обновления",
    pt: "Suas ações e atualizações mais recentes",
    ar: "أحدث إجراءاتك وتحديثاتك"
  },
  "activity.viewAll": {
    en: "View all",
    es: "Ver todo",
    fr: "Voir tout",
    de: "Alle ansehen",
    sv: "Visa alla",
    ja: "すべて表示",
    zh: "查看全部",
    ru: "Посмотреть все",
    pt: "Ver tudo",
    ar: "عرض الكل"
  },
  "activity.projectCreated": {
    en: "Project Created",
    es: "Proyecto Creado",
    fr: "Projet Créé",
    de: "Projekt Erstellt",
    sv: "Projekt Skapat",
    ja: "プロジェクト作成",
    zh: "项目已创建",
    ru: "Проект Создан",
    pt: "Projeto Criado",
    ar: "تم إنشاء المشروع"
  },
  "activity.fileUploaded": {
    en: "File Uploaded",
    es: "Archivo Subido",
    fr: "Fichier Téléchargé",
    de: "Datei Hochgeladen",
    sv: "Fil Uppladdad",
    ja: "ファイルアップロード完了",
    zh: "文件已上传",
    ru: "Файл Загружен",
    pt: "Arquivo Enviado",
    ar: "تم رفع الملف"
  },
  "activity.deviceConnected": {
    en: "Device Connected",
    es: "Dispositivo Conectado",
    fr: "Appareil Connecté",
    de: "Gerät Verbunden",
    sv: "Enhet Ansluten",
    ja: "デバイス接続完了",
    zh: "设备已连接",
    ru: "Устройство Подключено",
    pt: "Dispositivo Conectado",
    ar: "تم توصيل الجهاز"
  },
  "activity.projectShared": {
    en: "Project Shared",
    es: "Proyecto Compartido",
    fr: "Projet Partagé",
    de: "Projekt Geteilt",
    sv: "Projekt Delat",
    ja: "プロジェクト共有完了",
    zh: "项目已共享",
    ru: "Проект Опубликован",
    pt: "Projeto Compartilhado",
    ar: "تمت مشاركة المشروع"
  },
  "activity.ambientSoundscape": {
    en: "Ambient Soundscape",
    es: "Paisaje Sonoro Ambiental",
    fr: "Paysage Sonore Ambiant",
    de: "Ambiente Klanglandschaft",
    sv: "Omgivande Ljudlandskap",
    ja: "アンビエントサウンドスケープ",
    zh: "环境音景",
    ru: "Амбиентный Звуковой Ландшафт",
    pt: "Paisagem Sonora Ambiente",
    ar: "المشهد الصوتي المحيط"
  },
  "activity.summerBeatsEP": {
    en: "Summer Beats EP",
    es: "EP de Ritmos de Verano",
    fr: "EP Rythmes d'Été",
    de: "Sommer Beats EP",
    sv: "Sommar Beats EP",
    ja: "サマービーツEP",
    zh: "夏日节拍EP",
    ru: "Летние Ритмы EP",
    pt: "EP Batidas de Verão",
    ar: "إيقاعات الصيف EP"
  },
  "activity.hoursAgo": {
    en: "{hours} hours ago",
    es: "hace {hours} horas",
    fr: "il y a {hours} heures",
    de: "vor {hours} Stunden",
    sv: "{hours} timmar sedan",
    ja: "{hours}時間前",
    zh: "{hours}小时前",
    ru: "{hours} часов назад",
    pt: "{hours} horas atrás",
    ar: "منذ {hours} ساعات"
  },
  "activity.yesterday": {
    en: "Yesterday",
    es: "Ayer",
    fr: "Hier",
    de: "Gestern",
    sv: "Igår",
    ja: "昨日",
    zh: "昨天",
    ru: "Вчера",
    pt: "Ontem",
    ar: "أمس"
  },
  "activity.daysAgo": {
    en: "{days} days ago",
    es: "hace {days} días",
    fr: "il y a {days} jours",
    de: "vor {days} Tagen",
    sv: "{days} dagar sedan",
    ja: "{days}日前",
    zh: "{days}天前",
    ru: "{days} дней назад",
    pt: "{days} dias atrás",
    ar: "منذ {days} أيام"
  },
  "activity.weekAgo": {
    en: "1 week ago",
    es: "hace 1 semana",
    fr: "il y a 1 semaine",
    de: "vor 1 Woche",
    sv: "1 vecka sedan",
    ja: "1週間前",
    zh: "1周前",
    ru: "1 неделю назад",
    pt: "1 semana atrás",
    ar: "منذ أسبوع واحد"
  }
};

export default generalTranslations;
