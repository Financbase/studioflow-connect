
import { Language } from "../types";
import { processTranslations } from "../utils";

const designTranslations = {
  "design.tokens.title": {
    en: "Design Token Visualizer",
    es: "Visualizador de Tokens de Diseño",
    fr: "Visualiseur de Jetons de Design",
    de: "Design-Token-Visualisierer",
    sv: "Design Token Visualiserare",
    ja: "デザイントークンビジュアライザー",
    zh: "设计令牌可视化工具",
    ru: "Визуализатор Дизайн-Токенов",
    pt: "Visualizador de Tokens de Design",
    ar: "أداة عرض رموز التصميم"
  },
  "design.tokens.description": {
    en: "View and audit all design tokens used in the application",
    es: "Ver y auditar todos los tokens de diseño utilizados en la aplicación",
    fr: "Visualiser et auditer tous les jetons de design utilisés dans l'application",
    de: "Alle in der Anwendung verwendeten Design-Tokens anzeigen und prüfen",
    sv: "Visa och granska alla designtoken som används i applikationen",
    ja: "アプリケーションで使用されているすべてのデザイントークンを表示および監査する",
    zh: "查看和审核应用程序中使用的所有设计令牌",
    ru: "Просмотр и аудит всех токенов дизайна, используемых в приложении",
    pt: "Visualize e audite todos os tokens de design utilizados na aplicação",
    ar: "عرض وتدقيق جميع رموز التصميم المستخدمة في التطبيق"
  },
  "design.tokens.search": {
    en: "Search tokens...",
    es: "Buscar tokens...",
    fr: "Rechercher des jetons...",
    de: "Tokens suchen...",
    sv: "Sök tokens...",
    ja: "トークンを検索...",
    zh: "搜索令牌...",
    ru: "Поиск токенов...",
    pt: "Pesquisar tokens...",
    ar: "البحث عن الرموز..."
  },
  "design.tokens.show_values": {
    en: "Show values",
    es: "Mostrar valores",
    fr: "Afficher les valeurs",
    de: "Werte anzeigen",
    sv: "Visa värden",
    ja: "値を表示",
    zh: "显示值",
    ru: "Показать значения",
    pt: "Mostrar valores",
    ar: "إظهار القيم"
  },
  "design.tokens.tip.title": {
    en: "Usage Tip",
    es: "Consejo de Uso",
    fr: "Conseil d'Utilisation",
    de: "Verwendungstipp",
    sv: "Användningstips",
    ja: "使用上のヒント",
    zh: "使用提示",
    ru: "Совет по использованию",
    pt: "Dica de Uso",
    ar: "نصيحة استخدام"
  },
  "design.tokens.tip.description": {
    en: "Click on any token to copy its CSS variable to your clipboard.",
    es: "Haga clic en cualquier token para copiar su variable CSS al portapapeles.",
    fr: "Cliquez sur n'importe quel jeton pour copier sa variable CSS dans votre presse-papiers.",
    de: "Klicken Sie auf ein Token, um seine CSS-Variable in die Zwischenablage zu kopieren.",
    sv: "Klicka på valfri token för att kopiera dess CSS-variabel till urklipp.",
    ja: "任意のトークンをクリックすると、そのCSSの変数がクリップボードにコピーされます。",
    zh: "点击任何令牌以将其CSS变量复制到剪贴板。",
    ru: "Нажмите на любой токен, чтобы скопировать его CSS-переменную в буфер обмена.",
    pt: "Clique em qualquer token para copiar sua variável CSS para a área de transferência.",
    ar: "انقر على أي رمز لنسخ متغير CSS الخاص به إلى الحافظة."
  },
  "design.tokens.total": {
    en: "Total tokens",
    es: "Total de tokens",
    fr: "Total des jetons",
    de: "Tokens insgesamt",
    sv: "Totalt antal tokens",
    ja: "トークン合計",
    zh: "令牌总数",
    ru: "Всего токенов",
    pt: "Total de tokens",
    ar: "إجمالي الرموز"
  },
  "design.tokens.colors": {
    en: "Colors",
    es: "Colores",
    fr: "Couleurs",
    de: "Farben",
    sv: "Färger",
    ja: "色",
    zh: "颜色",
    ru: "Цвета",
    pt: "Cores",
    ar: "الألوان"
  },
  "design.tokens.spacing": {
    en: "Spacing",
    es: "Espaciado",
    fr: "Espacement",
    de: "Abstände",
    sv: "Avstånd",
    ja: "間隔",
    zh: "间距",
    ru: "Интервалы",
    pt: "Espaçamento",
    ar: "المسافات"
  },
  "design.tokens.typography": {
    en: "Typography",
    es: "Tipografía",
    fr: "Typographie",
    de: "Typografie",
    sv: "Typografi",
    ja: "タイポグラフィ",
    zh: "排版",
    ru: "Типография",
    pt: "Tipografia",
    ar: "الطباعة"
  },
  "design.tokens.other": {
    en: "Other",
    es: "Otro",
    fr: "Autre",
    de: "Andere",
    sv: "Övrigt",
    ja: "その他",
    zh: "其他",
    ru: "Другое",
    pt: "Outros",
    ar: "أخرى"
  },
  "design.tokens.tab.colors": {
    en: "Colors",
    es: "Colores",
    fr: "Couleurs",
    de: "Farben",
    sv: "Färger",
    ja: "色",
    zh: "颜色",
    ru: "Цвета",
    pt: "Cores",
    ar: "الألوان"
  },
  "design.tokens.tab.spacing": {
    en: "Spacing",
    es: "Espaciado",
    fr: "Espacement",
    de: "Abstände",
    sv: "Avstånd",
    ja: "間隔",
    zh: "间距",
    ru: "Интервалы",
    pt: "Espaçamento",
    ar: "المسافات"
  },
  "design.tokens.tab.typography": {
    en: "Typography",
    es: "Tipografía",
    fr: "Typographie",
    de: "Typografie",
    sv: "Typografi",
    ja: "タイポグラフィ",
    zh: "排版",
    ru: "Типография",
    pt: "Tipografia",
    ar: "الطباعة"
  },
  "design.tokens.tab.other": {
    en: "Other",
    es: "Otro",
    fr: "Autre",
    de: "Andere",
    sv: "Övrigt",
    ja: "その他",
    zh: "其他",
    ru: "Другое",
    pt: "Outros",
    ar: "أخرى"
  },
  "design.tokens.export": {
    en: "Export Report",
    es: "Exportar Informe",
    fr: "Exporter le Rapport",
    de: "Bericht Exportieren",
    sv: "Exportera Rapport",
    ja: "レポートをエクスポート",
    zh: "导出报告",
    ru: "Экспорт Отчета",
    pt: "Exportar Relatório",
    ar: "تصدير التقرير"
  },
  "design.tokens.download": {
    en: "Download JSON",
    es: "Descargar JSON",
    fr: "Télécharger JSON",
    de: "JSON Herunterladen",
    sv: "Ladda ner JSON",
    ja: "JSONをダウンロード",
    zh: "下载JSON",
    ru: "Скачать JSON",
    pt: "Baixar JSON",
    ar: "تحميل JSON"
  }
};

export default processTranslations(designTranslations);
