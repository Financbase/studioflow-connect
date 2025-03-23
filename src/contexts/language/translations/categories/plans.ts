
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const planTranslations = {
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
  }
};

export default processTranslations(planTranslations);
