
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const subscriptionSettingsTranslations: Record<string, Record<Language, string>> = {
  "settings.subscription.currentPlan": ensureAllLanguages({
    en: "Current Plan",
    es: "Plan Actual",
    fr: "Plan Actuel",
    de: "Aktueller Plan",
    sv: "Nuvarande Plan",
    ja: "現在のプラン",
    zh: "当前计划",
    ru: "Текущий план",
    pt: "Plano Atual",
    ar: "الخطة الحالية"
  }),
  "settings.subscription.billing": ensureAllLanguages({
    en: "Billing Information",
    es: "Información de Facturación",
    fr: "Informations de Facturation",
    de: "Zahlungsinformationen",
    sv: "Faktureringsinformation",
    ja: "請求情報",
    zh: "账单信息",
    ru: "Платежная информация",
    pt: "Informações de Cobrança",
    ar: "معلومات الفواتير"
  }),
  "settings.subscription.history": ensureAllLanguages({
    en: "Payment History",
    es: "Historial de Pagos",
    fr: "Historique des Paiements",
    de: "Zahlungsverlauf",
    sv: "Betalningshistorik",
    ja: "支払い履歴",
    zh: "支付历史",
    ru: "История платежей",
    pt: "Histórico de Pagamentos",
    ar: "سجل المدفوعات"
  }),
  "settings.subscription.upgrade": ensureAllLanguages({
    en: "Upgrade Plan",
    es: "Mejorar Plan",
    fr: "Mettre à Niveau le Plan",
    de: "Plan Upgraden",
    sv: "Uppgradera Plan",
    ja: "プランをアップグレード",
    zh: "升级计划",
    ru: "Улучшить план",
    pt: "Atualizar Plano",
    ar: "ترقية الخطة"
  })
};

export default subscriptionSettingsTranslations;
