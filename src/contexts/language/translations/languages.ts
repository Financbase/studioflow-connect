
import { Language } from "../types";
import { processTranslations } from "../utils";

// Names of languages in their own language
export const languageNames: Record<Language, Record<Language, string>> = {
  en: {
    en: "English",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    sv: "Engelska",
    ja: "英語",
    zh: "英语",
    ru: "Английский",
    pt: "Inglês",
    ar: "الإنجليزية"
  },
  es: {
    en: "Spanish",
    es: "Español",
    fr: "Espagnol",
    de: "Spanisch",
    sv: "Spanska",
    ja: "スペイン語",
    zh: "西班牙语",
    ru: "Испанский",
    pt: "Espanhol",
    ar: "الإسبانية"
  },
  fr: {
    en: "French",
    es: "Francés",
    fr: "Français",
    de: "Französisch",
    sv: "Franska",
    ja: "フランス語",
    zh: "法语",
    ru: "Французский",
    pt: "Francês",
    ar: "الفرنسية"
  },
  de: {
    en: "German",
    es: "Alemán",
    fr: "Allemand",
    de: "Deutsch",
    sv: "Tyska",
    ja: "ドイツ語",
    zh: "德语",
    ru: "Немецкий",
    pt: "Alemão",
    ar: "الألمانية"
  },
  sv: {
    en: "Swedish",
    es: "Sueco",
    fr: "Suédois",
    de: "Schwedisch",
    sv: "Svenska",
    ja: "スウェーデン語",
    zh: "瑞典语",
    ru: "Шведский",
    pt: "Sueco",
    ar: "السويدية"
  },
  ja: {
    en: "Japanese",
    es: "Japonés",
    fr: "Japonais",
    de: "Japanisch",
    sv: "Japanska",
    ja: "日本語",
    zh: "日语",
    ru: "Японский",
    pt: "Japonês",
    ar: "اليابانية"
  },
  zh: {
    en: "Chinese",
    es: "Chino",
    fr: "Chinois",
    de: "Chinesisch",
    sv: "Kinesiska",
    ja: "中国語",
    zh: "中文",
    ru: "Китайский",
    pt: "Chinês",
    ar: "الصينية"
  },
  ru: {
    en: "Russian",
    es: "Ruso",
    fr: "Russe",
    de: "Russisch",
    sv: "Ryska",
    ja: "ロシア語",
    zh: "俄语",
    ru: "Русский",
    pt: "Russo",
    ar: "الروسية"
  },
  pt: {
    en: "Portuguese",
    es: "Portugués",
    fr: "Portugais",
    de: "Portugiesisch",
    sv: "Portugisiska",
    ja: "ポルトガル語",
    zh: "葡萄牙语",
    ru: "Португальский",
    pt: "Português",
    ar: "البرتغالية"
  },
  ar: {
    en: "Arabic",
    es: "Árabe",
    fr: "Arabe",
    de: "Arabisch",
    sv: "Arabiska",
    ja: "アラビア語",
    zh: "阿拉伯语",
    ru: "Арабский",
    pt: "Árabe",
    ar: "العربية"
  }
};

// UI labels for language selection
const languageTranslations = {
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
  "view.simple": {
    en: "Simple",
    es: "Simple",
    fr: "Simple",
    de: "Einfach",
    sv: "Enkel",
    ja: "シンプル",
    zh: "简单",
    ru: "Простой",
    pt: "Simples",
    ar: "بسيط"
  },
  "view.advanced": {
    en: "Advanced",
    es: "Avanzado",
    fr: "Avancé",
    de: "Erweitert",
    sv: "Avancerad",
    ja: "高度",
    zh: "高级",
    ru: "Расширенный",
    pt: "Avançado",
    ar: "متقدم"
  },
  "view.custom": {
    en: "Custom",
    es: "Personalizado",
    fr: "Personnalisé",
    de: "Benutzerdefiniert",
    sv: "Anpassad",
    ja: "カスタム",
    zh: "自定义",
    ru: "Настраиваемый",
    pt: "Personalizado",
    ar: "مخصص"
  },
  "tooltips.simpleview": {
    en: "A simplified dashboard view",
    es: "Una vista de panel simplificada",
    fr: "Une vue de tableau de bord simplifiée",
    de: "Eine vereinfachte Dashboard-Ansicht",
    sv: "En förenklad instrumentpanelsvy",
    ja: "シンプルなダッシュボード表示",
    zh: "简化的仪表板视图",
    ru: "Упрощенный вид панели управления",
    pt: "Uma visualização simplificada do painel",
    ar: "عرض لوحة القيادة المبسطة"
  },
  "tooltips.advancedview": {
    en: "A full-featured dashboard with all widgets",
    es: "Un panel completo con todos los widgets",
    fr: "Un tableau de bord complet avec tous les widgets",
    de: "Ein vollständiges Dashboard mit allen Widgets",
    sv: "En fullfjädrad instrumentpanel med alla widgets",
    ja: "すべてのウィジェットを含む完全なダッシュボード",
    zh: "带有所有小部件的全功能仪表板",
    ru: "Полнофункциональная панель со всеми виджетами",
    pt: "Um painel completo com todos os widgets",
    ar: "لوحة قيادة كاملة الميزات مع جميع الأدوات"
  },
  "tooltips.customview": {
    en: "Create your own custom dashboard layout",
    es: "Crea tu propio diseño de panel personalizado",
    fr: "Créez votre propre mise en page de tableau de bord personnalisée",
    de: "Erstellen Sie Ihr eigenes benutzerdefiniertes Dashboard-Layout",
    sv: "Skapa din egen anpassade instrumentpanelslayout",
    ja: "あなた自身のカスタムダッシュボードレイアウトを作成",
    zh: "创建您自己的自定义仪表板布局",
    ru: "Создайте свой собственный макет панели управления",
    pt: "Crie seu próprio layout de painel personalizado",
    ar: "إنشاء تخطيط لوحة القيادة المخصصة الخاصة بك"
  },
  "tooltips.proonly": {
    en: "Available only in Pro plan",
    es: "Disponible solo en el plan Pro",
    fr: "Disponible uniquement dans le plan Pro",
    de: "Nur im Pro-Plan verfügbar",
    sv: "Endast tillgängligt i Pro-planen",
    ja: "Proプランでのみ利用可能",
    zh: "仅在专业版中可用",
    ru: "Доступно только в плане Pro",
    pt: "Disponível apenas no plano Pro",
    ar: "متوفر فقط في خطة Pro"
  },
  "plan.yourPlan": {
    en: "Your Plan",
    es: "Tu Plan",
    fr: "Votre Plan",
    de: "Ihr Plan",
    sv: "Din Plan",
    ja: "あなたのプラン",
    zh: "您的计划",
    ru: "Ваш План",
    pt: "Seu Plano",
    ar: "خطتك"
  },
  "plan.subscriptionDetails": {
    en: "Current subscription details",
    es: "Detalles de la suscripción actual",
    fr: "Détails de l'abonnement actuel",
    de: "Aktuelle Abonnementdetails",
    sv: "Aktuella prenumerationsdetaljer",
    ja: "現在のサブスクリプションの詳細",
    zh: "当前订阅详情",
    ru: "Сведения о текущей подписке",
    pt: "Detalhes da assinatura atual",
    ar: "تفاصيل الاشتراك الحالي"
  },
  "plan.free": {
    en: "Free Plan",
    es: "Plan Gratuito",
    fr: "Plan Gratuit",
    de: "Kostenloser Plan",
    sv: "Gratis Plan",
    ja: "無料プラン",
    zh: "免费计划",
    ru: "Бесплатный План",
    pt: "Plano Gratuito",
    ar: "خطة مجانية"
  },
  "plan.standard": {
    en: "Standard Plan",
    es: "Plan Estándar",
    fr: "Plan Standard",
    de: "Standard-Plan",
    sv: "Standardplan",
    ja: "スタンダードプラン",
    zh: "标准计划",
    ru: "Стандартный План",
    pt: "Plano Padrão",
    ar: "الخطة القياسية"
  },
  "plan.pro": {
    en: "Pro Plan",
    es: "Plan Pro",
    fr: "Plan Pro",
    de: "Pro-Plan",
    sv: "Pro-plan",
    ja: "プロプラン",
    zh: "专业计划",
    ru: "Про План",
    pt: "Plano Pro",
    ar: "خطة برو"
  },
  "plan.enterprise": {
    en: "Enterprise Plan",
    es: "Plan Empresarial",
    fr: "Plan Entreprise",
    de: "Unternehmensplan",
    sv: "Företagsplan",
    ja: "エンタープライズプラン",
    zh: "企业计划",
    ru: "Корпоративный План",
    pt: "Plano Empresarial",
    ar: "خطة المؤسسة"
  },
  "plan.upgrade": {
    en: "Upgrade",
    es: "Mejorar",
    fr: "Améliorer",
    de: "Upgraden",
    sv: "Uppgradera",
    ja: "アップグレード",
    zh: "升级",
    ru: "Улучшить",
    pt: "Atualizar",
    ar: "ترقية"
  },
  "plan.projects": {
    en: "Projects",
    es: "Proyectos",
    fr: "Projets",
    de: "Projekte",
    sv: "Projekt",
    ja: "プロジェクト",
    zh: "项目",
    ru: "Проекты",
    pt: "Projetos",
    ar: "المشاريع"
  },
  "plan.storage": {
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
  },
  "plan.aiFeatures": {
    en: "AI Features",
    es: "Funciones de IA",
    fr: "Fonctionnalités IA",
    de: "KI-Funktionen",
    sv: "AI-funktioner",
    ja: "AI機能",
    zh: "AI功能",
    ru: "ИИ Функции",
    pt: "Recursos de IA",
    ar: "ميزات الذكاء الاصطناعي"
  },
  "plan.limited": {
    en: "Limited",
    es: "Limitado",
    fr: "Limité",
    de: "Begrenzt",
    sv: "Begränsad",
    ja: "限定",
    zh: "有限",
    ru: "Ограничено",
    pt: "Limitado",
    ar: "محدود"
  },
  "plan.fullAccess": {
    en: "Full Access",
    es: "Acceso Completo",
    fr: "Accès Complet",
    de: "Voller Zugriff",
    sv: "Full Tillgång",
    ja: "フルアクセス",
    zh: "完全访问",
    ru: "Полный Доступ",
    pt: "Acesso Completo",
    ar: "وصول كامل"
  },
  "plan.unlimited": {
    en: "Unlimited",
    es: "Ilimitado",
    fr: "Illimité",
    de: "Unbegrenzt",
    sv: "Obegränsad",
    ja: "無制限",
    zh: "无限",
    ru: "Безлимитный",
    pt: "Ilimitado",
    ar: "غير محدود"
  }
};

export default processTranslations(languageTranslations);
