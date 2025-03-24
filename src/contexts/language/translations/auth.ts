
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const authTranslations: Record<string, Record<Language, string>> = {
  "auth.signIn": ensureAllLanguages({
    en: "Sign In",
    es: "Iniciar Sesión",
    fr: "Se Connecter",
    de: "Anmelden",
    sv: "Logga In",
    ja: "サインイン",
    zh: "登录",
    ru: "Войти",
    pt: "Entrar",
    ar: "تسجيل الدخول"
  }),
  "auth.signUp": ensureAllLanguages({
    en: "Sign Up",
    es: "Registrarse",
    fr: "S'inscrire",
    de: "Registrieren",
    sv: "Registrera",
    ja: "サインアップ",
    zh: "注册",
    ru: "Зарегистрироваться",
    pt: "Cadastrar",
    ar: "إنشاء حساب"
  }),
  "auth.signOut": ensureAllLanguages({
    en: "Sign Out",
    es: "Cerrar Sesión",
    fr: "Se Déconnecter",
    de: "Abmelden",
    sv: "Logga Ut",
    ja: "サインアウト",
    zh: "退出",
    ru: "Выйти",
    pt: "Sair",
    ar: "تسجيل الخروج"
  }),
  "auth.email": ensureAllLanguages({
    en: "Email",
    es: "Correo",
    fr: "Email",
    de: "E-Mail",
    sv: "E-post",
    ja: "メール",
    zh: "电子邮件",
    ru: "Эл. почта",
    pt: "Email",
    ar: "البريد الإلكتروني"
  }),
  "auth.password": ensureAllLanguages({
    en: "Password",
    es: "Contraseña",
    fr: "Mot de passe",
    de: "Passwort",
    sv: "Lösenord",
    ja: "パスワード",
    zh: "密码",
    ru: "Пароль",
    pt: "Senha",
    ar: "كلمة المرور"
  }),
  "auth.forgotPassword": ensureAllLanguages({
    en: "Forgot Password?",
    es: "¿Olvidó su Contraseña?",
    fr: "Mot de passe oublié?",
    de: "Passwort vergessen?",
    sv: "Glömt lösenord?",
    ja: "パスワードをお忘れですか？",
    zh: "忘记密码？",
    ru: "Забыли пароль?",
    pt: "Esqueceu a senha?",
    ar: "نسيت كلمة المرور؟"
  })
};

export default authTranslations;
