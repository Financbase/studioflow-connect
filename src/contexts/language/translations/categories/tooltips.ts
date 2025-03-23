
import { Language } from "../../types";
import { ensureAllLanguages } from "../../utils";

const tooltipTranslations: Record<string, Record<Language, string>> = {
  "tooltips.featureNotAvailable": ensureAllLanguages({
    en: "Feature Not Available",
    es: "Función No Disponible",
    fr: "Fonctionnalité Non Disponible",
    de: "Funktion Nicht Verfügbar",
    sv: "Funktion Inte Tillgänglig",
    ja: "機能は利用できません",
    zh: "功能不可用",
    ru: "Функция Недоступна",
    pt: "Recurso Não Disponível",
    ar: "الميزة غير متوفرة"
  }),
  "tooltips.proonly": ensureAllLanguages({
    en: "This feature is only available with Pro subscription",
    es: "Esta función solo está disponible con la suscripción Pro",
    fr: "Cette fonctionnalité est uniquement disponible avec l'abonnement Pro",
    de: "Diese Funktion ist nur mit Pro-Abonnement verfügbar",
    sv: "Denna funktion är endast tillgänglig med Pro-prenumeration",
    ja: "この機能はProサブスクリプションでのみ利用可能です",
    zh: "此功能仅适用于专业版订阅",
    ru: "Эта функция доступна только с подпиской Pro",
    pt: "Este recurso está disponível apenas com a assinatura Pro",
    ar: "هذه الميزة متوفرة فقط مع اشتراك Pro"
  }),
  "tooltips.simpleview": ensureAllLanguages({
    en: "Basic view with essential widgets",
    es: "Vista básica con widgets esenciales",
    fr: "Vue basique avec widgets essentiels",
    de: "Einfache Ansicht mit grundlegenden Widgets",
    sv: "Grundläggande vy med viktiga widgets",
    ja: "必須ウィジェットを備えた基本ビュー",
    zh: "带有基本小部件的简单视图",
    ru: "Базовый вид с основными виджетами",
    pt: "Visualização básica com widgets essenciais",
    ar: "عرض أساسي مع الأدوات الأساسية"
  }),
  "tooltips.advancedview": ensureAllLanguages({
    en: "Detailed view with all available widgets",
    es: "Vista detallada con todos los widgets disponibles",
    fr: "Vue détaillée avec tous les widgets disponibles",
    de: "Detaillierte Ansicht mit allen verfügbaren Widgets",
    sv: "Detaljerad vy med alla tillgängliga widgets",
    ja: "利用可能なすべてのウィジェットを備えた詳細ビュー",
    zh: "包含所有可用小部件的详细视图",
    ru: "Подробный вид со всеми доступными виджетами",
    pt: "Visualização detalhada com todos os widgets disponíveis",
    ar: "عرض مفصل مع جميع الأدوات المتاحة"
  }),
  "tooltips.customview": ensureAllLanguages({
    en: "Personalized view with custom widget arrangement",
    es: "Vista personalizada con disposición de widgets a medida",
    fr: "Vue personnalisée avec disposition de widgets personnalisée",
    de: "Personalisierte Ansicht mit benutzerdefinierter Widget-Anordnung",
    sv: "Personlig vy med anpassad widgetarrangemang",
    ja: "カスタムウィジェット配置によるパーソナライズされたビュー",
    zh: "自定义小部件排列的个性化视图",
    ru: "Персонализированный вид с пользовательским расположением виджетов",
    pt: "Visualização personalizada com disposição personalizada de widgets",
    ar: "عرض مخصص مع ترتيب مخصص للأدوات"
  })
};

export default tooltipTranslations;
