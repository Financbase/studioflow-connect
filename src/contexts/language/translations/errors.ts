
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const errorTranslations: Record<string, Record<Language, string>> = {
  "errors.generic": ensureAllLanguages({
    en: "An error occurred",
    es: "Ha ocurrido un error",
    fr: "Une erreur s'est produite",
    de: "Ein Fehler ist aufgetreten",
    sv: "Ett fel inträffade",
    ja: "エラーが発生しました",
    zh: "发生错误",
    ru: "Произошла ошибка",
    pt: "Ocorreu um erro",
    ar: "حدث خطأ"
  }),
  "errors.network": ensureAllLanguages({
    en: "Network error. Please check your connection",
    es: "Error de red. Por favor, compruebe su conexión",
    fr: "Erreur réseau. Veuillez vérifier votre connexion",
    de: "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung",
    sv: "Nätverksfel. Kontrollera din anslutning",
    ja: "ネットワークエラー。接続を確認してください",
    zh: "网络错误。请检查您的连接",
    ru: "Ошибка сети. Пожалуйста, проверьте ваше соединение",
    pt: "Erro de rede. Verifique sua conexão",
    ar: "خطأ في الشبكة. يرجى التحقق من اتصالك"
  }),
  "errors.auth": ensureAllLanguages({
    en: "Authentication error",
    es: "Error de autenticación",
    fr: "Erreur d'authentification",
    de: "Authentifizierungsfehler",
    sv: "Autentiseringsfel",
    ja: "認証エラー",
    zh: "认证错误",
    ru: "Ошибка аутентификации",
    pt: "Erro de autenticação",
    ar: "خطأ في المصادقة"
  }),
  "errors.notFound": ensureAllLanguages({
    en: "Resource not found",
    es: "Recurso no encontrado",
    fr: "Ressource non trouvée",
    de: "Ressource nicht gefunden",
    sv: "Resursen hittades inte",
    ja: "リソースが見つかりません",
    zh: "资源未找到",
    ru: "Ресурс не найден",
    pt: "Recurso não encontrado",
    ar: "المورد غير موجود"
  }),
  "errors.permission": ensureAllLanguages({
    en: "You don't have permission to access this resource",
    es: "No tienes permiso para acceder a este recurso",
    fr: "Vous n'avez pas la permission d'accéder à cette ressource",
    de: "Sie haben keine Berechtigung, auf diese Ressource zuzugreifen",
    sv: "Du har inte behörighet att komma åt denna resurs",
    ja: "このリソースにアクセスする権限がありません",
    zh: "您没有权限访问此资源",
    ru: "У вас нет разрешения на доступ к этому ресурсу",
    pt: "Você não tem permissão para acessar este recurso",
    ar: "ليس لديك إذن للوصول إلى هذا المورد"
  }),
  "errors.dashboardError": ensureAllLanguages({
    en: "Error loading dashboard",
    es: "Error al cargar el panel de control",
    fr: "Erreur lors du chargement du tableau de bord",
    de: "Fehler beim Laden des Dashboards",
    sv: "Fel vid laddning av instrumentpanelen",
    ja: "ダッシュボードの読み込みエラー",
    zh: "加载仪表板时出错",
    ru: "Ошибка загрузки панели управления",
    pt: "Erro ao carregar o painel",
    ar: "خطأ في تحميل لوحة التحكم"
  }),
  "errors.validation": ensureAllLanguages({
    en: "Validation error",
    es: "Error de validación",
    fr: "Erreur de validation",
    de: "Validierungsfehler",
    sv: "Valideringsfel",
    ja: "バリデーションエラー",
    zh: "验证错误",
    ru: "Ошибка проверки",
    pt: "Erro de validação",
    ar: "خطأ في التحقق من الصحة"
  })
};

export default errorTranslations;
