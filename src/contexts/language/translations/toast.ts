
import { Language } from "../types";
import { processTranslations } from "../utils";

const toastTranslations = {
  "toast.success": {
    en: "Success",
    es: "Éxito",
    fr: "Succès",
    de: "Erfolg",
    sv: "Framgång",
    ja: "成功",
    zh: "成功",
    ru: "Успех",
    pt: "Sucesso",
    ar: "نجاح"
  },
  "toast.error": {
    en: "Error",
    es: "Error",
    fr: "Erreur",
    de: "Fehler",
    sv: "Fel",
    ja: "エラー",
    zh: "错误",
    ru: "Ошибка",
    pt: "Erro",
    ar: "خطأ"
  },
  "toast.warning": {
    en: "Warning",
    es: "Advertencia",
    fr: "Avertissement",
    de: "Warnung",
    sv: "Varning",
    ja: "警告",
    zh: "警告",
    ru: "Предупреждение",
    pt: "Aviso",
    ar: "تحذير"
  },
  "toast.info": {
    en: "Information",
    es: "Información",
    fr: "Information",
    de: "Information",
    sv: "Information",
    ja: "情報",
    zh: "信息",
    ru: "Информация",
    pt: "Informação",
    ar: "معلومات"
  },
  "toast.connectsuccess": {
    en: "Connected Successfully",
    es: "Conectado con Éxito",
    fr: "Connecté avec Succès",
    de: "Erfolgreich Verbunden",
    sv: "Ansluten Framgångsrikt",
    ja: "接続に成功しました",
    zh: "连接成功",
    ru: "Успешно Подключено",
    pt: "Conectado com Sucesso",
    ar: "تم الاتصال بنجاح"
  },
  "toast.drivescanning": {
    en: "Scanning drive for content...",
    es: "Escaneando unidad para contenido...",
    fr: "Analyse du lecteur pour le contenu...",
    de: "Laufwerk wird nach Inhalten durchsucht...",
    sv: "Skannar enheten för innehåll...",
    ja: "コンテンツのためにドライブをスキャンしています...",
    zh: "正在扫描驱动器内容...",
    ru: "Сканирование диска на наличие содержимого...",
    pt: "Verificando unidade para conteúdo...",
    ar: "جارٍ فحص محرك الأقراص بحثًا عن المحتوى..."
  },
  "toast.optimizing": {
    en: "Optimizing Drive",
    es: "Optimizando Unidad",
    fr: "Optimisation du Lecteur",
    de: "Laufwerk wird optimiert",
    sv: "Optimerar Enhet",
    ja: "ドライブを最適化しています",
    zh: "正在优化驱动器",
    ru: "Оптимизация Диска",
    pt: "Otimizando Unidade",
    ar: "جارٍ تحسين محرك الأقراص"
  },
  "toast.optimizationongoing": {
    en: "Optimization in progress, this may take a few minutes",
    es: "Optimización en progreso, esto puede tomar unos minutos",
    fr: "Optimisation en cours, cela peut prendre quelques minutes",
    de: "Optimierung läuft, dies kann einige Minuten dauern",
    sv: "Optimering pågår, detta kan ta några minuter",
    ja: "最適化が進行中です、数分かかる場合があります",
    zh: "正在进行优化，这可能需要几分钟",
    ru: "Идет оптимизация, это может занять несколько минут",
    pt: "Otimização em andamento, isso pode levar alguns minutos",
    ar: "التحسين قيد التقدم ، قد يستغرق هذا بضع دقائق"
  },
  "toast.synccomplete": {
    en: "Sync Complete",
    es: "Sincronización Completa",
    fr: "Synchronisation Terminée",
    de: "Synchronisierung Abgeschlossen",
    sv: "Synkronisering Klar",
    ja: "同期完了",
    zh: "同步完成",
    ru: "Синхронизация Завершена",
    pt: "Sincronização Concluída",
    ar: "اكتملت المزامنة"
  },
  "toast.drivesready": {
    en: "All drives are ready to use",
    es: "Todas las unidades están listas para usar",
    fr: "Tous les lecteurs sont prêts à être utilisés",
    de: "Alle Laufwerke sind einsatzbereit",
    sv: "Alla enheter är redo att användas",
    ja: "すべてのドライブが使用可能です",
    zh: "所有驱动器都可以使用",
    ru: "Все диски готовы к использованию",
    pt: "Todas as unidades estão prontas para uso",
    ar: "جميع محركات الأقراص جاهزة للاستخدام"
  }
};

export default processTranslations(toastTranslations);
