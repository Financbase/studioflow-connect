
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const planTranslations: Record<string, Record<Language, string>> = {
  "plan.yourPlan": ensureAllLanguages({
    en: "Your Plan",
    es: "Tu Plan",
    fr: "Votre Forfait",
    de: "Dein Plan",
    sv: "Din Plan",
    ja: "あなたのプラン",
    zh: "您的方案",
    ru: "Ваш План",
    pt: "Seu Plano",
    ar: "خطتك"
  }),
  "plan.subscriptionDetails": ensureAllLanguages({
    en: "Your subscription details and features",
    es: "Detalles y características de tu suscripción",
    fr: "Détails et fonctionnalités de votre abonnement",
    de: "Details und Funktionen deines Abonnements",
    sv: "Din prenumerationsdetaljer och funktioner",
    ja: "サブスクリプションの詳細と機能",
    zh: "您的订阅详情和功能",
    ru: "Детали и функции вашей подписки",
    pt: "Detalhes e recursos da sua assinatura",
    ar: "تفاصيل وميزات اشتراكك"
  }),
  "plan.free": ensureAllLanguages({
    en: "Free",
    es: "Gratis",
    fr: "Gratuit",
    de: "Kostenlos",
    sv: "Gratis",
    ja: "無料",
    zh: "免费",
    ru: "Бесплатный",
    pt: "Gratuito",
    ar: "مجاني"
  }),
  "plan.standard": ensureAllLanguages({
    en: "Standard",
    es: "Estándar",
    fr: "Standard",
    de: "Standard",
    sv: "Standard",
    ja: "スタンダード",
    zh: "标准",
    ru: "Стандартный",
    pt: "Padrão",
    ar: "قياسي"
  }),
  "plan.pro": ensureAllLanguages({
    en: "Pro",
    es: "Pro",
    fr: "Pro",
    de: "Pro",
    sv: "Pro",
    ja: "プロ",
    zh: "专业版",
    ru: "Про",
    pt: "Pro",
    ar: "احترافي"
  }),
  "plan.enterprise": ensureAllLanguages({
    en: "Enterprise",
    es: "Empresa",
    fr: "Entreprise",
    de: "Unternehmen",
    sv: "Företag",
    ja: "エンタープライズ",
    zh: "企业版",
    ru: "Корпоративный",
    pt: "Empresarial",
    ar: "مؤسسة"
  }),
  "plan.upgrade": ensureAllLanguages({
    en: "Upgrade",
    es: "Mejorar",
    fr: "Améliorer",
    de: "Upgrade",
    sv: "Uppgradera",
    ja: "アップグレード",
    zh: "升级",
    ru: "Улучшить",
    pt: "Atualizar",
    ar: "ترقية"
  }),
  "plan.projects": ensureAllLanguages({
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
  }),
  "plan.storage": ensureAllLanguages({
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
  "plan.aiFeatures": ensureAllLanguages({
    en: "AI Features",
    es: "Funciones de IA",
    fr: "Fonctionnalités IA",
    de: "KI-Funktionen",
    sv: "AI-funktioner",
    ja: "AI機能",
    zh: "AI功能",
    ru: "Функции ИИ",
    pt: "Recursos de IA",
    ar: "ميزات الذكاء الاصطناعي"
  }),
  "plan.limited": ensureAllLanguages({
    en: "Limited",
    es: "Limitado",
    fr: "Limité",
    de: "Begrenzt",
    sv: "Begränsad",
    ja: "制限あり",
    zh: "有限的",
    ru: "Ограниченный",
    pt: "Limitado",
    ar: "محدود"
  }),
  "plan.fullAccess": ensureAllLanguages({
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
  }),
  "plan.unlimited": ensureAllLanguages({
    en: "Unlimited",
    es: "Ilimitado",
    fr: "Illimité",
    de: "Unbegrenzt",
    sv: "Obegränsad",
    ja: "無制限",
    zh: "无限制",
    ru: "Безлимитный",
    pt: "Ilimitado",
    ar: "غير محدود"
  })
};

export default planTranslations;
