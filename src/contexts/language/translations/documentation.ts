
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const documentationTranslations: Record<string, Record<Language, string>> = {
  "docs.title": ensureAllLanguages({
    en: "Documentation",
    es: "Documentación",
    fr: "Documentation",
    de: "Dokumentation",
    sv: "Dokumentation",
    ja: "ドキュメント",
    zh: "文档",
    ru: "Документация",
    pt: "Documentação",
    ar: "التوثيق"
  }),
  "docs.subtitle": ensureAllLanguages({
    en: "Learn how to use StudioFlow",
    es: "Aprende a usar StudioFlow",
    fr: "Apprenez à utiliser StudioFlow",
    de: "Lernen Sie, wie Sie StudioFlow verwenden",
    sv: "Lär dig hur du använder StudioFlow",
    ja: "StudioFlowの使い方を学ぶ",
    zh: "学习如何使用StudioFlow",
    ru: "Узнайте, как использовать StudioFlow",
    pt: "Aprenda a usar o StudioFlow",
    ar: "تعلم كيفية استخدام StudioFlow"
  }),
  "docs.getting_started": ensureAllLanguages({
    en: "Getting Started",
    es: "Primeros pasos",
    fr: "Premiers pas",
    de: "Erste Schritte",
    sv: "Komma igång",
    ja: "はじめに",
    zh: "入门指南",
    ru: "Начало работы",
    pt: "Primeiros Passos",
    ar: "البدء"
  }),
  "docs.getting_started_description": ensureAllLanguages({
    en: "Start your journey with StudioFlow",
    es: "Comienza tu viaje con StudioFlow",
    fr: "Commencez votre voyage avec StudioFlow",
    de: "Beginnen Sie Ihre Reise mit StudioFlow",
    sv: "Börja din resa med StudioFlow",
    ja: "StudioFlowでの旅を始める",
    zh: "开始您的StudioFlow之旅",
    ru: "Начните свой путь с StudioFlow",
    pt: "Inicie sua jornada com o StudioFlow",
    ar: "ابدأ رحلتك مع StudioFlow"
  }),
  "docs.advanced_guides": ensureAllLanguages({
    en: "Advanced Guides",
    es: "Guías avanzadas",
    fr: "Guides avancés",
    de: "Fortgeschrittene Anleitungen",
    sv: "Avancerade guider",
    ja: "高度なガイド",
    zh: "高级指南",
    ru: "Продвинутые руководства",
    pt: "Guias Avançados",
    ar: "أدلة متقدمة"
  }),
  "docs.advanced_guides_description": ensureAllLanguages({
    en: "Detailed documentation for power users",
    es: "Documentación detallada para usuarios avanzados",
    fr: "Documentation détaillée pour utilisateurs expérimentés",
    de: "Detaillierte Dokumentation für erfahrene Benutzer",
    sv: "Detaljerad dokumentation för avancerade användare",
    ja: "パワーユーザー向けの詳細なドキュメント",
    zh: "为高级用户提供详细文档",
    ru: "Подробная документация для опытных пользователей",
    pt: "Documentação detalhada para usuários avançados",
    ar: "وثائق مفصلة للمستخدمين المتقدمين"
  }),
  "docs.api_reference": ensureAllLanguages({
    en: "API Reference",
    es: "Referencia de API",
    fr: "Référence de l'API",
    de: "API-Referenz",
    sv: "API-referens",
    ja: "APIリファレンス",
    zh: "API参考",
    ru: "Справочник по API",
    pt: "Referência da API",
    ar: "مرجع واجهة برمجة التطبيقات"
  }),
  "docs.api_description": ensureAllLanguages({
    en: "Complete API documentation",
    es: "Documentación completa de la API",
    fr: "Documentation complète de l'API",
    de: "Vollständige API-Dokumentation",
    sv: "Komplett API-dokumentation",
    ja: "完全なAPIドキュメント",
    zh: "完整的API文档",
    ru: "Полная документация по API",
    pt: "Documentação completa da API",
    ar: "وثائق واجهة برمجة التطبيقات الكاملة"
  }),
  "docs.api_content": ensureAllLanguages({
    en: "Explore our comprehensive API documentation to integrate StudioFlow with your applications.",
    es: "Explora nuestra documentación completa de API para integrar StudioFlow con tus aplicaciones.",
    fr: "Explorez notre documentation API complète pour intégrer StudioFlow à vos applications.",
    de: "Erkunden Sie unsere umfassende API-Dokumentation, um StudioFlow in Ihre Anwendungen zu integrieren.",
    sv: "Utforska vår omfattande API-dokumentation för att integrera StudioFlow med dina applikationer.",
    ja: "StudioFlowをアプリケーションと統合するための包括的なAPIドキュメントをご覧ください。",
    zh: "探索我们全面的API文档，将StudioFlow与您的应用程序集成。",
    ru: "Изучите нашу полную документацию по API для интеграции StudioFlow с вашими приложениями.",
    pt: "Explore nossa documentação abrangente da API para integrar o StudioFlow com seus aplicativos.",
    ar: "استكشف وثائق واجهة برمجة التطبيقات الشاملة لدينا لدمج StudioFlow مع تطبيقاتك."
  }),
  "docs.authentication": ensureAllLanguages({
    en: "Authentication",
    es: "Autenticación",
    fr: "Authentification",
    de: "Authentifizierung",
    sv: "Autentisering",
    ja: "認証",
    zh: "认证",
    ru: "Аутентификация",
    pt: "Autenticação",
    ar: "المصادقة"
  }),
  "docs.authentication_description": ensureAllLanguages({
    en: "Learn how to authenticate with the StudioFlow API",
    es: "Aprende a autenticarte con la API de StudioFlow",
    fr: "Apprenez à vous authentifier avec l'API StudioFlow",
    de: "Erfahren Sie, wie Sie sich bei der StudioFlow-API authentifizieren",
    sv: "Lär dig hur du autentiserar med StudioFlow API",
    ja: "StudioFlow APIでの認証方法を学ぶ",
    zh: "了解如何通过StudioFlow API进行身份验证",
    ru: "Узнайте, как пройти аутентификацию в API StudioFlow",
    pt: "Aprenda a se autenticar com a API do StudioFlow",
    ar: "تعرف على كيفية المصادقة باستخدام واجهة برمجة تطبيقات StudioFlow"
  }),
  "docs.examples_title": ensureAllLanguages({
    en: "Code Examples",
    es: "Ejemplos de código",
    fr: "Exemples de code",
    de: "Code-Beispiele",
    sv: "Kodexempel",
    ja: "コード例",
    zh: "代码示例",
    ru: "Примеры кода",
    pt: "Exemplos de Código",
    ar: "أمثلة الكود"
  }),
  "docs.examples_description": ensureAllLanguages({
    en: "Ready-to-use code samples",
    es: "Ejemplos de código listos para usar",
    fr: "Exemples de code prêts à l'emploi",
    de: "Gebrauchsfertige Codebeispiele",
    sv: "Färdiga kodexempel",
    ja: "すぐに使えるコードサンプル",
    zh: "即用代码示例",
    ru: "Готовые к использованию примеры кода",
    pt: "Amostras de código prontas para uso",
    ar: "عينات كود جاهزة للاستخدام"
  }),
  "docs.examples_content": ensureAllLanguages({
    en: "Copy and paste these code examples to quickly implement StudioFlow features in your projects.",
    es: "Copia y pega estos ejemplos de código para implementar rápidamente las funciones de StudioFlow en tus proyectos.",
    fr: "Copiez et collez ces exemples de code pour implémenter rapidement les fonctionnalités de StudioFlow dans vos projets.",
    de: "Kopieren und fügen Sie diese Codebeispiele ein, um StudioFlow-Funktionen schnell in Ihren Projekten zu implementieren.",
    sv: "Kopiera och klistra in dessa kodexempel för att snabbt implementera StudioFlow-funktioner i dina projekt.",
    ja: "これらのコード例をコピーして貼り付けることで、プロジェクトにStudioFlowの機能をすばやく実装できます。",
    zh: "复制并粘贴这些代码示例，快速在项目中实现StudioFlow功能。",
    ru: "Скопируйте и вставьте эти примеры кода, чтобы быстро реализовать функции StudioFlow в ваших проектах.",
    pt: "Copie e cole esses exemplos de código para implementar rapidamente os recursos do StudioFlow em seus projetos.",
    ar: "انسخ والصق أمثلة التعليمات البرمجية هذه لتنفيذ ميزات StudioFlow بسرعة في مشاريعك."
  }),
  "docs.basic_integration": ensureAllLanguages({
    en: "Basic Integration",
    es: "Integración básica",
    fr: "Intégration de base",
    de: "Grundlegende Integration",
    sv: "Grundläggande integration",
    ja: "基本的な統合",
    zh: "基本集成",
    ru: "Базовая интеграция",
    pt: "Integração Básica",
    ar: "التكامل الأساسي"
  }),
  "docs.basic_integration_description": ensureAllLanguages({
    en: "Simple examples to get started with StudioFlow integration",
    es: "Ejemplos simples para comenzar con la integración de StudioFlow",
    fr: "Exemples simples pour débuter avec l'intégration de StudioFlow",
    de: "Einfache Beispiele für den Einstieg in die StudioFlow-Integration",
    sv: "Enkla exempel för att komma igång med StudioFlow-integration",
    ja: "StudioFlow統合を始めるための簡単な例",
    zh: "开始StudioFlow集成的简单示例",
    ru: "Простые примеры для начала интеграции с StudioFlow",
    pt: "Exemplos simples para começar com a integração do StudioFlow",
    ar: "أمثلة بسيطة للبدء في تكامل StudioFlow"
  })
};

export default documentationTranslations;
