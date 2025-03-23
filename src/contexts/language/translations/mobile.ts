
import { Language } from "../types";
import { processTranslations } from "../utils";

const mobileTranslations = {
  "mobile.toggleMenu": {
    en: "Toggle menu",
    es: "Alternar menú",
    fr: "Basculer le menu",
    de: "Menü umschalten",
    sv: "Växla meny",
    ja: "メニュー切り替え",
    zh: "切换菜单",
    ru: "Переключить меню",
    pt: "Alternar menu",
    ar: "تبديل القائمة"
  },
  "mobile.quickconnect": {
    en: "Quick Connect",
    es: "Conexión Rápida",
    fr: "Connexion Rapide",
    de: "Schnellverbindung",
    sv: "Snabbanslutning",
    ja: "クイック接続",
    zh: "快速连接",
    ru: "Быстрое подключение",
    pt: "Conexão Rápida",
    ar: "اتصال سريع"
  },
  "mobile.connectdescription": {
    en: "Connect to local drives and devices",
    es: "Conectar a unidades y dispositivos locales",
    fr: "Connecter aux lecteurs et appareils locaux",
    de: "Mit lokalen Laufwerken und Geräten verbinden",
    sv: "Anslut till lokala enheter och apparater",
    ja: "ローカルドライブとデバイスに接続",
    zh: "连接到本地驱动器和设备",
    ru: "Подключение к локальным дискам и устройствам",
    pt: "Conectar a unidades e dispositivos locais",
    ar: "الاتصال بالأقراص والأجهزة المحلية"
  },
  "mobile.connectnewdrive": {
    en: "Connect New Drive",
    es: "Conectar Nueva Unidad",
    fr: "Connecter Nouveau Lecteur",
    de: "Neues Laufwerk verbinden",
    sv: "Anslut Ny Enhet",
    ja: "新しいドライブを接続",
    zh: "连接新驱动器",
    ru: "Подключить новый диск",
    pt: "Conectar Nova Unidade",
    ar: "توصيل محرك أقراص جديد"
  },
  "mobile.upgradetopro": {
    en: "Upgrade to Pro for Enhanced Features",
    es: "Actualiza a Pro para características mejoradas",
    fr: "Passez à Pro pour des fonctionnalités améliorées",
    de: "Upgrade auf Pro für erweiterte Funktionen",
    sv: "Uppgradera till Pro för förbättrade funktioner",
    ja: "機能強化のためにProにアップグレード",
    zh: "升级到Pro以获取增强功能",
    ru: "Обновитесь до Pro для расширенных функций",
    pt: "Atualize para Pro para recursos aprimorados",
    ar: "الترقية إلى النسخة الاحترافية للحصول على ميزات محسنة"
  },
  "mobile.unlockcontent": {
    en: "Unlock advanced AI features, unlimited projects and priority support.",
    es: "Desbloquea funciones avanzadas de IA, proyectos ilimitados y soporte prioritario.",
    fr: "Débloquez des fonctionnalités d'IA avancées, des projets illimités et un support prioritaire.",
    de: "Schalten Sie erweiterte KI-Funktionen, unbegrenzte Projekte und vorrangigen Support frei.",
    sv: "Lås upp avancerade AI-funktioner, obegränsade projekt och prioriterat stöd.",
    ja: "高度なAI機能、無制限のプロジェクト、優先サポートを解除します。",
    zh: "解锁高级AI功能，无限项目和优先支持。",
    ru: "Разблокируйте расширенные функции ИИ, неограниченные проекты и приоритетную поддержку.",
    pt: "Desbloqueie recursos avançados de IA, projetos ilimitados e suporte prioritário.",
    ar: "فتح ميزات الذكاء الاصطناعي المتقدمة والمشاريع غير المحدودة والدعم ذي الأولوية."
  }
};

export default processTranslations(mobileTranslations);
