
import { Language } from "../types";
import { ensureAllLanguages } from "../utils";

const dashboardTranslations: Record<string, Record<Language, string>> = {
  "dashboard.greeting.morning": ensureAllLanguages({
    en: "Good morning",
    es: "Buenos días",
    fr: "Bonjour",
    de: "Guten Morgen",
    sv: "God morgon",
    ja: "おはようございます",
    zh: "早上好",
    ru: "Доброе утро",
    pt: "Bom dia",
    ar: "صباح الخير"
  }),
  "dashboard.greeting.afternoon": ensureAllLanguages({
    en: "Good afternoon",
    es: "Buenas tardes",
    fr: "Bon après-midi",
    de: "Guten Tag",
    sv: "God eftermiddag",
    ja: "こんにちは",
    zh: "下午好",
    ru: "Добрый день",
    pt: "Boa tarde",
    ar: "مساء الخير"
  }),
  "dashboard.greeting.evening": ensureAllLanguages({
    en: "Good evening",
    es: "Buenas noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    sv: "God kväll",
    ja: "こんばんは",
    zh: "晚上好",
    ru: "Добрый вечер",
    pt: "Boa noite",
    ar: "مساء الخير"
  }),
  "dashboard.user": ensureAllLanguages({
    en: "User",
    es: "Usuario",
    fr: "Utilisateur",
    de: "Benutzer",
    sv: "Användare",
    ja: "ユーザー",
    zh: "用户",
    ru: "Пользователь",
    pt: "Usuário",
    ar: "المستخدم"
  }),
  "dashboard.viewChanged": ensureAllLanguages({
    en: "View Changed",
    es: "Vista Cambiada",
    fr: "Vue Modifiée",
    de: "Ansicht Geändert",
    sv: "Vy Ändrad",
    ja: "表示が変更されました",
    zh: "视图已更改",
    ru: "Вид Изменен",
    pt: "Visualização Alterada",
    ar: "تم تغيير العرض"
  }),
  "dashboard.viewSet": ensureAllLanguages({
    en: "Dashboard view set to",
    es: "Vista del panel establecida en",
    fr: "Vue du tableau de bord définie sur",
    de: "Dashboard-Ansicht eingestellt auf",
    sv: "Instrumentpanelsvy inställd på",
    ja: "ダッシュボード表示を次に設定しました：",
    zh: "仪表板视图设置为",
    ru: "Вид панели управления установлен на",
    pt: "Visualização do painel definida para",
    ar: "تم تعيين عرض لوحة المعلومات إلى"
  })
};

export default dashboardTranslations;
