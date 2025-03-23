
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const colorPaletteTranslations: Record<string, Record<Language, string>> = {
  "palette.title": ensureAllLanguages({
    en: "Color Palettes",
    es: "Paletas de Colores",
    fr: "Palettes de Couleurs",
    de: "Farbpaletten",
    sv: "Färgpaletter",
    ja: "カラーパレット",
    zh: "调色板",
    ru: "Цветовые палитры",
    pt: "Paletas de Cores",
    ar: "لوحات الألوان"
  }),
  "palette.description": ensureAllLanguages({
    en: "Create and manage your color palettes",
    es: "Crea y gestiona tus paletas de colores",
    fr: "Créer et gérer vos palettes de couleurs",
    de: "Erstellen und verwalten Sie Ihre Farbpaletten",
    sv: "Skapa och hantera dina färgpaletter",
    ja: "カラーパレットの作成と管理",
    zh: "创建和管理您的调色板",
    ru: "Создание и управление цветовыми палитрами",
    pt: "Crie e gerencie suas paletas de cores",
    ar: "إنشاء وإدارة لوحات الألوان الخاصة بك"
  }),
  "palette.preview": ensureAllLanguages({
    en: "Preview",
    es: "Vista previa",
    fr: "Aperçu",
    de: "Vorschau",
    sv: "Förhandsvisning",
    ja: "プレビュー",
    zh: "预览",
    ru: "Предварительный просмотр",
    pt: "Pré-visualização",
    ar: "معاينة"
  }),
  "palette.visualizer": ensureAllLanguages({
    en: "Visualizer",
    es: "Visualizador",
    fr: "Visualiseur",
    de: "Visualisierer",
    sv: "Visualiserare",
    ja: "ビジュアライザー",
    zh: "可视化器",
    ru: "Визуализатор",
    pt: "Visualizador",
    ar: "العارض"
  }),
  "palette.scheme.generator": ensureAllLanguages({
    en: "Scheme Generator",
    es: "Generador de Esquemas",
    fr: "Générateur de Schémas",
    de: "Schema-Generator",
    sv: "Schemgenerator",
    ja: "スキームジェネレーター",
    zh: "方案生成器",
    ru: "Генератор схем",
    pt: "Gerador de Esquemas",
    ar: "مولد المخططات"
  }),
  "palette.contrast.check": ensureAllLanguages({
    en: "Contrast Check",
    es: "Comprobación de Contraste",
    fr: "Vérification du Contraste",
    de: "Kontrast-Prüfung",
    sv: "Kontrastkontroll",
    ja: "コントラストチェック",
    zh: "对比度检查",
    ru: "Проверка контрастности",
    pt: "Verificação de Contraste",
    ar: "فحص التباين"
  }),
  "palette.background": ensureAllLanguages({
    en: "Background",
    es: "Fondo",
    fr: "Arrière-plan",
    de: "Hintergrund",
    sv: "Bakgrund",
    ja: "背景",
    zh: "背景",
    ru: "Фон",
    pt: "Fundo",
    ar: "الخلفية"
  }),
  "palette.primary.button": ensureAllLanguages({
    en: "Primary Button",
    es: "Botón Primario",
    fr: "Bouton Principal",
    de: "Primärer Button",
    sv: "Primär Knapp",
    ja: "プライマリーボタン",
    zh: "主按钮",
    ru: "Основная кнопка",
    pt: "Botão Primário",
    ar: "زر أساسي"
  }),
  "palette.secondary.button": ensureAllLanguages({
    en: "Secondary Button",
    es: "Botón Secundario",
    fr: "Bouton Secondaire",
    de: "Sekundärer Button",
    sv: "Sekundär Knapp",
    ja: "セカンダリーボタン",
    zh: "次按钮",
    ru: "Дополнительная кнопка",
    pt: "Botão Secundário",
    ar: "زر ثانوي"
  }),
  "palette.text.color": ensureAllLanguages({
    en: "Text Color",
    es: "Color de Texto",
    fr: "Couleur du Texte",
    de: "Textfarbe",
    sv: "Textfärg",
    ja: "テキストカラー",
    zh: "文本颜色",
    ru: "Цвет текста",
    pt: "Cor do Texto",
    ar: "لون النص"
  }),
  "palette.card": ensureAllLanguages({
    en: "Card",
    es: "Tarjeta",
    fr: "Carte",
    de: "Karte",
    sv: "Kort",
    ja: "カード",
    zh: "卡片",
    ru: "Карточка",
    pt: "Cartão",
    ar: "بطاقة"
  }),
  "palette.accent": ensureAllLanguages({
    en: "Accent",
    es: "Acento",
    fr: "Accent",
    de: "Akzent",
    sv: "Accent",
    ja: "アクセント",
    zh: "强调色",
    ru: "Акцент",
    pt: "Destaque",
    ar: "لهجة"
  }),
  "palette.destructive": ensureAllLanguages({
    en: "Destructive",
    es: "Destructivo",
    fr: "Destructif",
    de: "Destruktiv",
    sv: "Destruktiv",
    ja: "破壊的",
    zh: "破坏性",
    ru: "Деструктивный",
    pt: "Destrutivo",
    ar: "تدميري"
  }),
  "palette.save.current": ensureAllLanguages({
    en: "Save Current Palette",
    es: "Guardar Paleta Actual",
    fr: "Enregistrer la Palette Actuelle",
    de: "Aktuelle Palette Speichern",
    sv: "Spara Nuvarande Palett",
    ja: "現在のパレットを保存",
    zh: "保存当前调色板",
    ru: "Сохранить текущую палитру",
    pt: "Salvar Paleta Atual",
    ar: "حفظ اللوحة الحالية"
  }),
  "palette.name": ensureAllLanguages({
    en: "Palette Name",
    es: "Nombre de la Paleta",
    fr: "Nom de la Palette",
    de: "Palette Name",
    sv: "Palettnamn",
    ja: "パレット名",
    zh: "调色板名称",
    ru: "Название палитры",
    pt: "Nome da Paleta",
    ar: "اسم اللوحة"
  }),
  "palette.description.optional": ensureAllLanguages({
    en: "Description (optional)",
    es: "Descripción (opcional)",
    fr: "Description (optionnel)",
    de: "Beschreibung (optional)",
    sv: "Beskrivning (valfritt)",
    ja: "説明（任意）",
    zh: "描述（可选）",
    ru: "Описание (необязательно)",
    pt: "Descrição (opcional)",
    ar: "الوصف (اختياري)"
  })
};

export default colorPaletteTranslations;
