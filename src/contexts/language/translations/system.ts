
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const systemTranslations: Record<string, Record<Language, string>> = {
  "system.error": ensureAllLanguages({
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
  "system.success": ensureAllLanguages({
    en: "Success",
    es: "Éxito",
    fr: "Succès",
    de: "Erfolg",
    sv: "Lyckades",
    ja: "成功",
    zh: "成功",
    ru: "Успех",
    pt: "Sucesso",
    ar: "نجاح"
  }),
  "system.loading": ensureAllLanguages({
    en: "Loading...",
    es: "Cargando...",
    fr: "Chargement...",
    de: "Laden...",
    sv: "Laddar...",
    ja: "読み込み中...",
    zh: "加载中...",
    ru: "Загрузка...",
    pt: "Carregando...",
    ar: "جار التحميل..."
  }),
  "system.retry": ensureAllLanguages({
    en: "Retry",
    es: "Reintentar",
    fr: "Réessayer",
    de: "Wiederholen",
    sv: "Försök igen",
    ja: "再試行",
    zh: "重试",
    ru: "Повторить",
    pt: "Tentar novamente",
    ar: "إعادة المحاولة"
  })
};

export default systemTranslations;
