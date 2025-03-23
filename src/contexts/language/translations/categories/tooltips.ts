
import { Language } from "../../types";
import { processTranslations } from "../../utils";

const tooltipTranslations = {
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
  }
};

export default processTranslations(tooltipTranslations);
