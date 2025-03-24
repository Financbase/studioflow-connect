
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
    es: "Aprenda a usar StudioFlow",
    fr: "Apprenez à utiliser StudioFlow",
    de: "Lernen Sie, wie man StudioFlow benutzt",
    sv: "Lär dig hur du använder StudioFlow",
    ja: "StudioFlowの使い方を学ぶ",
    zh: "学习如何使用StudioFlow",
    ru: "Изучите, как использовать StudioFlow",
    pt: "Aprenda a usar o StudioFlow",
    ar: "تعلم كيفية استخدام StudioFlow"
  }),
  
  "docs.getting_started": ensureAllLanguages({
    en: "Getting Started",
    es: "Primeros Pasos",
    fr: "Démarrage",
    de: "Erste Schritte",
    sv: "Komma igång",
    ja: "はじめに",
    zh: "入门指南",
    ru: "Начало работы",
    pt: "Introdução",
    ar: "البدء"
  }),
  "docs.getting_started_description": ensureAllLanguages({
    en: "Quick guides to help you get started with StudioFlow",
    es: "Guías rápidas para ayudarlo a comenzar con StudioFlow",
    fr: "Guides rapides pour vous aider à démarrer avec StudioFlow",
    de: "Schnellanleitungen, die Ihnen den Einstieg in StudioFlow erleichtern",
    sv: "Snabbguider för att hjälpa dig komma igång med StudioFlow",
    ja: "StudioFlowを始めるのに役立つクイックガイド",
    zh: "帮助您开始使用StudioFlow的快速指南",
    ru: "Краткие руководства, которые помогут вам начать работу с StudioFlow",
    pt: "Guias rápidos para ajudar você a começar com o StudioFlow",
    ar: "أدلة سريعة لمساعدتك على البدء مع StudioFlow"
  }),
  
  "docs.advanced_guides": ensureAllLanguages({
    en: "Advanced Guides",
    es: "Guías Avanzadas",
    fr: "Guides Avancés",
    de: "Fortgeschrittene Anleitungen",
    sv: "Avancerade Guider",
    ja: "高度なガイド",
    zh: "高级指南",
    ru: "Продвинутые руководства",
    pt: "Guias Avançados",
    ar: "أدلة متقدمة"
  }),
  "docs.advanced_guides_description": ensureAllLanguages({
    en: "Detailed documentation on advanced StudioFlow features",
    es: "Documentación detallada sobre características avanzadas de StudioFlow",
    fr: "Documentation détaillée sur les fonctionnalités avancées de StudioFlow",
    de: "Detaillierte Dokumentation zu erweiterten StudioFlow-Funktionen",
    sv: "Detaljerad dokumentation om avancerade StudioFlow-funktioner",
    ja: "StudioFlowの高度な機能に関する詳細なドキュメント",
    zh: "关于StudioFlow高级功能的详细文档",
    ru: "Подробная документация по расширенным функциям StudioFlow",
    pt: "Documentação detalhada sobre recursos avançados do StudioFlow",
    ar: "وثائق مفصلة حول ميزات StudioFlow المتقدمة"
  }),
  
  "docs.api_reference": ensureAllLanguages({
    en: "API Reference",
    es: "Referencia de API",
    fr: "Référence API",
    de: "API-Referenz",
    sv: "API-referens",
    ja: "APIリファレンス",
    zh: "API参考",
    ru: "Справочник по API",
    pt: "Referência da API",
    ar: "مرجع واجهة برمجة التطبيقات"
  }),
  "docs.api_description": ensureAllLanguages({
    en: "Complete reference documentation for the StudioFlow API",
    es: "Documentación de referencia completa para la API de StudioFlow",
    fr: "Documentation de référence complète pour l'API StudioFlow",
    de: "Vollständige Referenzdokumentation für die StudioFlow-API",
    sv: "Fullständig referensdokumentation för StudioFlow API",
    ja: "StudioFlow APIの完全なリファレンスドキュメント",
    zh: "StudioFlow API的完整参考文档",
    ru: "Полная справочная документация по API StudioFlow",
    pt: "Documentação de referência completa para a API do StudioFlow",
    ar: "وثائق مرجعية كاملة لواجهة برمجة تطبيقات StudioFlow"
  }),
  "docs.api_content": ensureAllLanguages({
    en: "Access detailed information about all available endpoints, parameters, and response types for integrating with StudioFlow services.",
    es: "Acceda a información detallada sobre todos los endpoints, parámetros y tipos de respuesta disponibles para integrarse con los servicios de StudioFlow.",
    fr: "Accédez à des informations détaillées sur tous les points de terminaison, paramètres et types de réponse disponibles pour l'intégration aux services StudioFlow.",
    de: "Greifen Sie auf detaillierte Informationen zu allen verfügbaren Endpunkten, Parametern und Antworttypen für die Integration mit StudioFlow-Diensten zu.",
    sv: "Få tillgång till detaljerad information om alla tillgängliga slutpunkter, parametrar och svarstyper för integration med StudioFlow-tjänster.",
    ja: "StudioFlowサービスとの統合のために、利用可能なすべてのエンドポイント、パラメータ、およびレスポンスタイプに関する詳細情報にアクセスします。",
    zh: "访问有关与StudioFlow服务集成的所有可用端点、参数和响应类型的详细信息。",
    ru: "Получите доступ к подробной информации обо всех доступных конечных точках, параметрах и типах ответов для интеграции со службами StudioFlow.",
    pt: "Acesse informações detalhadas sobre todos os endpoints, parâmetros e tipos de resposta disponíveis para integração com os serviços do StudioFlow.",
    ar: "الوصول إلى معلومات مفصلة حول جميع نقاط النهاية المتاحة والمعلمات وأنواع الاستجابة للتكامل مع خدمات StudioFlow."
  }),
  
  "docs.examples_title": ensureAllLanguages({
    en: "Code Examples",
    es: "Ejemplos de Código",
    fr: "Exemples de Code",
    de: "Code-Beispiele",
    sv: "Kodexempel",
    ja: "コード例",
    zh: "代码示例",
    ru: "Примеры кода",
    pt: "Exemplos de Código",
    ar: "أمثلة التعليمات البرمجية"
  }),
  "docs.examples_description": ensureAllLanguages({
    en: "Implementation examples for common use cases",
    es: "Ejemplos de implementación para casos de uso comunes",
    fr: "Exemples d'implémentation pour les cas d'utilisation courants",
    de: "Implementierungsbeispiele für gängige Anwendungsfälle",
    sv: "Implementeringsexempel för vanliga användningsfall",
    ja: "一般的なユースケースの実装例",
    zh: "常见用例的实现示例",
    ru: "Примеры реализации для распространенных случаев использования",
    pt: "Exemplos de implementação para casos de uso comuns",
    ar: "أمثلة التنفيذ لحالات الاستخدام الشائعة"
  }),
  "docs.examples_content": ensureAllLanguages({
    en: "Browse through our collection of code examples showing how to implement common StudioFlow features in your own projects.",
    es: "Explore nuestra colección de ejemplos de código que muestran cómo implementar características comunes de StudioFlow en sus propios proyectos.",
    fr: "Parcourez notre collection d'exemples de code montrant comment implémenter des fonctionnalités StudioFlow courantes dans vos propres projets.",
    de: "Durchsuchen Sie unsere Sammlung von Codebeispielen, die zeigen, wie Sie gängige StudioFlow-Funktionen in Ihren eigenen Projekten implementieren können.",
    sv: "Bläddra genom vår samling av kodexempel som visar hur du implementerar vanliga StudioFlow-funktioner i dina egna projekt.",
    ja: "独自のプロジェクトで一般的なStudioFlow機能を実装する方法を示すコード例のコレクションを参照してください。",
    zh: "浏览我们的代码示例集合，展示如何在您自己的项目中实现常见的StudioFlow功能。",
    ru: "Просмотрите нашу коллекцию примеров кода, показывающих, как реализовать общие функции StudioFlow в ваших собственных проектах.",
    pt: "Navegue por nossa coleção de exemplos de código mostrando como implementar recursos comuns do StudioFlow em seus próprios projetos.",
    ar: "تصفح مجموعتنا من أمثلة التعليمات البرمجية التي توضح كيفية تنفيذ ميزات StudioFlow الشائعة في مشاريعك الخاصة."
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
    es: "Aprenda cómo autenticarse con la API de StudioFlow",
    fr: "Apprenez à vous authentifier avec l'API StudioFlow",
    de: "Erfahren Sie, wie Sie sich bei der StudioFlow-API authentifizieren",
    sv: "Lär dig hur du autentiserar med StudioFlow API",
    ja: "StudioFlow APIでの認証方法を学ぶ",
    zh: "了解如何使用StudioFlow API进行身份验证",
    ru: "Узнайте, как пройти аутентификацию с помощью API StudioFlow",
    pt: "Saiba como se autenticar com a API do StudioFlow",
    ar: "تعرف على كيفية المصادقة باستخدام واجهة برمجة تطبيقات StudioFlow"
  }),
  
  "docs.basic_integration": ensureAllLanguages({
    en: "Basic Integration",
    es: "Integración Básica",
    fr: "Intégration de Base",
    de: "Grundlegende Integration",
    sv: "Grundläggande Integration",
    ja: "基本的な統合",
    zh: "基本集成",
    ru: "Базовая интеграция",
    pt: "Integração Básica",
    ar: "التكامل الأساسي"
  }),
  "docs.basic_integration_description": ensureAllLanguages({
    en: "How to integrate StudioFlow into your DAW",
    es: "Cómo integrar StudioFlow en su DAW",
    fr: "Comment intégrer StudioFlow dans votre DAW",
    de: "Wie man StudioFlow in Ihre DAW integriert",
    sv: "Hur du integrerar StudioFlow i din DAW",
    ja: "StudioFlowをDAWに統合する方法",
    zh: "如何将StudioFlow集成到您的DAW中",
    ru: "Как интегрировать StudioFlow в вашу DAW",
    pt: "Como integrar o StudioFlow em seu DAW",
    ar: "كيفية دمج StudioFlow في DAW الخاص بك"
  })
};

export default documentationTranslations;
