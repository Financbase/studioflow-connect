
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const aiToolsTranslations: Record<string, Record<Language, string>> = {
  "ai.title": ensureAllLanguages({
    en: "AI Tools",
    es: "Herramientas de IA",
    fr: "Outils d'IA",
    de: "KI-Werkzeuge",
    sv: "AI-verktyg",
    ja: "AIツール",
    zh: "AI工具",
    ru: "Инструменты ИИ",
    pt: "Ferramentas de IA",
    ar: "أدوات الذكاء الاصطناعي"
  }),
  "ai.subtitle": ensureAllLanguages({
    en: "Enhance your workflow with AI-powered tools",
    es: "Mejora tu flujo de trabajo con herramientas impulsadas por IA",
    fr: "Améliorez votre flux de travail avec des outils alimentés par l'IA",
    de: "Verbessern Sie Ihren Workflow mit KI-gestützten Tools",
    sv: "Förbättra ditt arbetsflöde med AI-drivna verktyg",
    ja: "AIを活用したツールでワークフローを強化",
    zh: "用AI驱动的工具增强您的工作流程",
    ru: "Улучшите свой рабочий процесс с помощью инструментов на базе ИИ",
    pt: "Aprimore seu fluxo de trabalho com ferramentas baseadas em IA",
    ar: "تعزيز سير عملك باستخدام أدوات مدعومة بالذكاء الاصطناعي"
  }),
  "ai.generator.title": ensureAllLanguages({
    en: "AI Music Generator",
    es: "Generador de Música IA",
    fr: "Générateur de Musique IA",
    de: "KI-Musikgenerator",
    sv: "AI-musikgenerator",
    ja: "AI音楽ジェネレーター",
    zh: "AI音乐生成器",
    ru: "ИИ-генератор музыки",
    pt: "Gerador de Música com IA",
    ar: "منشئ الموسيقى بالذكاء الاصطناعي"
  }),
  "ai.generator.description": ensureAllLanguages({
    en: "Create unique compositions with artificial intelligence",
    es: "Crea composiciones únicas con inteligencia artificial",
    fr: "Créez des compositions uniques avec l'intelligence artificielle",
    de: "Erstellen Sie einzigartige Kompositionen mit künstlicher Intelligenz",
    sv: "Skapa unika kompositioner med artificiell intelligens",
    ja: "人工知能で独自の作曲を作成",
    zh: "使用人工智能创建独特的作品",
    ru: "Создавайте уникальные композиции с помощью искусственного интеллекта",
    pt: "Crie composições únicas com inteligência artificial",
    ar: "إنشاء مقطوعات فريدة باستخدام الذكاء الاصطناعي"
  }),
  "ai.mastering.title": ensureAllLanguages({
    en: "AI Mastering",
    es: "Masterización con IA",
    fr: "Mastering IA",
    de: "KI-Mastering",
    sv: "AI-mastering",
    ja: "AIマスタリング",
    zh: "AI母带处理",
    ru: "ИИ-мастеринг",
    pt: "Masterização com IA",
    ar: "المعالجة النهائية بالذكاء الاصطناعي"
  }),
  "ai.mastering.description": ensureAllLanguages({
    en: "Professional-grade audio mastering with machine learning",
    es: "Masterización de audio de nivel profesional con aprendizaje automático",
    fr: "Mastering audio de niveau professionnel avec apprentissage automatique",
    de: "Professionelles Audio-Mastering mit maschinellem Lernen",
    sv: "Professionell ljudmastering med maskininlärning",
    ja: "機械学習によるプロフェッショナルグレードのオーディオマスタリング",
    zh: "使用机器学习进行专业级音频母带处理",
    ru: "Профессиональный мастеринг аудио с помощью машинного обучения",
    pt: "Masterização de áudio de nível profissional com aprendizado de máquina",
    ar: "معالجة صوتية احترافية باستخدام التعلم الآلي"
  }),
  "ai.transcription.title": ensureAllLanguages({
    en: "AI Transcription",
    es: "Transcripción con IA",
    fr: "Transcription IA",
    de: "KI-Transkription",
    sv: "AI-transkription",
    ja: "AI文字起こし",
    zh: "AI转录",
    ru: "ИИ-транскрипция",
    pt: "Transcrição com IA",
    ar: "النسخ بالذكاء الاصطناعي"
  }),
  "ai.transcription.description": ensureAllLanguages({
    en: "Convert audio to text with high accuracy",
    es: "Convierte audio a texto con alta precisión",
    fr: "Convertissez l'audio en texte avec une grande précision",
    de: "Konvertieren Sie Audio in Text mit hoher Genauigkeit",
    sv: "Konvertera ljud till text med hög noggrannhet",
    ja: "高精度でオーディオをテキストに変換",
    zh: "高精度地将音频转换为文本",
    ru: "Преобразуйте аудио в текст с высокой точностью",
    pt: "Converta áudio em texto com alta precisão",
    ar: "تحويل الصوت إلى نص بدقة عالية"
  }),
  "ai.remix.title": ensureAllLanguages({
    en: "AI Remix Assistant",
    es: "Asistente de Remix IA",
    fr: "Assistant de Remix IA",
    de: "KI-Remix-Assistent",
    sv: "AI-remix-assistent",
    ja: "AIリミックスアシスタント",
    zh: "AI混音助手",
    ru: "ИИ-ассистент ремиксов",
    pt: "Assistente de Remix com IA",
    ar: "مساعد إعادة المزج بالذكاء الاصطناعي"
  }),
  "ai.remix.description": ensureAllLanguages({
    en: "Create new versions of your tracks with AI guidance",
    es: "Crea nuevas versiones de tus pistas con la guía de IA",
    fr: "Créez de nouvelles versions de vos pistes avec les conseils de l'IA",
    de: "Erstellen Sie neue Versionen Ihrer Tracks mit KI-Unterstützung",
    sv: "Skapa nya versioner av dina spår med AI-vägledning",
    ja: "AIのガイダンスであなたのトラックの新しいバージョンを作成",
    zh: "在AI指导下创建音轨的新版本",
    ru: "Создавайте новые версии ваших треков с помощью ИИ",
    pt: "Crie novas versões de suas faixas com orientação de IA",
    ar: "إنشاء إصدارات جديدة من مساراتك بإرشاد الذكاء الاصطناعي"
  }),
  "ai.stem.title": ensureAllLanguages({
    en: "AI Stem Separation",
    es: "Separación de Stems con IA",
    fr: "Séparation de Stems IA",
    de: "KI-Stem-Trennung",
    sv: "AI-stem-separation",
    ja: "AIステム分離",
    zh: "AI音轨分离",
    ru: "ИИ-разделение стемов",
    pt: "Separação de Stems com IA",
    ar: "فصل المسارات بالذكاء الاصطناعي"
  }),
  "ai.stem.description": ensureAllLanguages({
    en: "Extract vocals, drums, bass, and other elements from mixed audio",
    es: "Extrae voces, batería, bajo y otros elementos del audio mezclado",
    fr: "Extrayez les voix, la batterie, la basse et d'autres éléments de l'audio mixé",
    de: "Extrahieren Sie Gesang, Schlagzeug, Bass und andere Elemente aus gemischtem Audio",
    sv: "Extrahera sång, trummor, bas och andra element från mixat ljud",
    ja: "ミックスされたオーディオからボーカル、ドラム、ベースなどの要素を抽出",
    zh: "从混音中提取人声、鼓、贝斯和其他元素",
    ru: "Извлекайте вокал, барабаны, бас и другие элементы из микшированного аудио",
    pt: "Extraia vocais, bateria, baixo e outros elementos do áudio mixado",
    ar: "استخراج الأصوات والطبول والجهير وعناصر أخرى من الصوت المختلط"
  }),
  "ai.lyric.title": ensureAllLanguages({
    en: "AI Lyric Generator",
    es: "Generador de Letras IA",
    fr: "Générateur de Paroles IA",
    de: "KI-Liedtext-Generator",
    sv: "AI-låttextgenerator",
    ja: "AI歌詞ジェネレーター",
    zh: "AI歌词生成器",
    ru: "ИИ-генератор текстов",
    pt: "Gerador de Letras com IA",
    ar: "منشئ كلمات الأغاني بالذكاء الاصطناعي"
  }),
  "ai.lyric.description": ensureAllLanguages({
    en: "Generate creative and inspiring lyrics for your music",
    es: "Genera letras creativas e inspiradoras para tu música",
    fr: "Générez des paroles créatives et inspirantes pour votre musique",
    de: "Generieren Sie kreative und inspirierende Texte für Ihre Musik",
    sv: "Generera kreativa och inspirerande låttexter för din musik",
    ja: "あなたの音楽のための創造的でインスピレーションを与える歌詞を生成",
    zh: "为您的音乐生成创意和鼓舞人心的歌词",
    ru: "Создавайте креативные и вдохновляющие тексты для вашей музыки",
    pt: "Gere letras criativas e inspiradoras para sua música",
    ar: "إنشاء كلمات إبداعية وملهمة لموسيقاك"
  }),
  "ai.proOnly": ensureAllLanguages({
    en: "Pro Feature",
    es: "Función Pro",
    fr: "Fonctionnalité Pro",
    de: "Pro-Funktion",
    sv: "Pro-funktion",
    ja: "プロ機能",
    zh: "专业版功能",
    ru: "Функция Pro",
    pt: "Recurso Pro",
    ar: "ميزة احترافية"
  }),
  "ai.learnMore": ensureAllLanguages({
    en: "Learn More",
    es: "Más Información",
    fr: "En Savoir Plus",
    de: "Mehr Erfahren",
    sv: "Läs Mer",
    ja: "詳細を見る",
    zh: "了解更多",
    ru: "Узнать больше",
    pt: "Saiba Mais",
    ar: "معرفة المزيد"
  }),
  "ai.try": ensureAllLanguages({
    en: "Try Now",
    es: "Probar Ahora",
    fr: "Essayer Maintenant",
    de: "Jetzt Ausprobieren",
    sv: "Prova Nu",
    ja: "今すぐ試す",
    zh: "立即尝试",
    ru: "Попробовать сейчас",
    pt: "Experimentar Agora",
    ar: "جرب الآن"
  })
};

export default aiToolsTranslations;
