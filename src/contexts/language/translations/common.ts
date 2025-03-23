
import { Language } from "../types";
import { processTranslations } from "../utils";

const commonTranslations = {
  "button.submit": {
    en: "Submit",
    es: "Enviar",
    fr: "Soumettre",
    de: "Absenden",
    sv: "Skicka",
    ja: "送信",
    zh: "提交",
    ru: "Отправить",
    pt: "Enviar",
    ar: "إرسال"
  },
  "button.cancel": {
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    sv: "Avbryt",
    ja: "キャンセル",
    zh: "取消",
    ru: "Отмена",
    pt: "Cancelar",
    ar: "إلغاء"
  },
  "button.save": {
    en: "Save",
    es: "Guardar",
    fr: "Enregistrer",
    de: "Speichern",
    sv: "Spara",
    ja: "保存",
    zh: "保存",
    ru: "Сохранить",
    pt: "Salvar",
    ar: "حفظ"
  },
  "button.upgrade": {
    en: "Upgrade",
    es: "Actualizar",
    fr: "Améliorer",
    de: "Upgraden",
    sv: "Uppgradera",
    ja: "アップグレード",
    zh: "升级",
    ru: "Обновить",
    pt: "Atualizar",
    ar: "ترقية"
  },
  "button.login": {
    en: "Log In",
    es: "Iniciar Sesión",
    fr: "Se Connecter",
    de: "Anmelden",
    sv: "Logga In",
    ja: "ログイン",
    zh: "登录",
    ru: "Вход",
    pt: "Entrar",
    ar: "تسجيل الدخول"
  },
  "button.signup": {
    en: "Sign Up",
    es: "Registrarse",
    fr: "S'inscrire",
    de: "Registrieren",
    sv: "Registrera",
    ja: "サインアップ",
    zh: "注册",
    ru: "Регистрация",
    pt: "Inscrever-se",
    ar: "التسجيل"
  },
  "button.continue": {
    en: "Continue",
    es: "Continuar",
    fr: "Continuer",
    de: "Fortfahren",
    sv: "Fortsätt",
    ja: "続ける",
    zh: "继续",
    ru: "Продолжить",
    pt: "Continuar",
    ar: "استمرار"
  }
};

export default processTranslations(commonTranslations);
