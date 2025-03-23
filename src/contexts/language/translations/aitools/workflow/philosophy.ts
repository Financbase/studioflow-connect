
import { Language } from "../../../types";
import { ensureAllLanguages } from "../../../utils";

const workflowPhilosophyTranslations: Record<string, Record<Language, string>> = {
  "ai.philosophyTitle": ensureAllLanguages({
    en: "Our AI Philosophy",
    es: "Nuestra Filosofía de IA",
    fr: "Notre Philosophie d'IA",
    de: "Unsere KI-Philosophie",
    sv: "Vår AI-filosofi",
    ja: "私たちのAI哲学",
    zh: "我们的AI理念",
    ru: "Наша философия ИИ",
    pt: "Nossa Filosofia de IA",
    ar: "فلسفتنا في الذكاء الاصطناعي"
  }),
  "ai.philosophyDescription": ensureAllLanguages({
    en: "We believe in AI that enhances human creativity rather than replacing it",
    es: "Creemos en la IA que mejora la creatividad humana en lugar de reemplazarla",
    fr: "Nous croyons en une IA qui améliore la créativité humaine plutôt que de la remplacer",
    de: "Wir glauben an KI, die die menschliche Kreativität verbessert, anstatt sie zu ersetzen",
    sv: "Vi tror på AI som förbättrar mänsklig kreativitet snarare än att ersätta den",
    ja: "私たちは人間の創造性を置き換えるのではなく、向上させるAIを信じています",
    zh: "我们相信AI应该增强人类创造力而非取代它",
    ru: "Мы верим в ИИ, который усиливает человеческое творчество, а не заменяет его",
    pt: "Acreditamos em IA que aprimora a criatividade humana em vez de substituí-la",
    ar: "نؤمن بالذكاء الاصطناعي الذي يعزز الإبداع البشري بدلاً من استبداله"
  })
};

export default workflowPhilosophyTranslations;
