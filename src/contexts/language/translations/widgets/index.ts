
import { Language } from "../../types";
import generalWidgetTranslations from "./general";
import navigationWidgetTranslations from "./navigation";
import userWidgetTranslations from "./user";
import tooltipWidgetTranslations from "./tooltips";

// Combine all widget translations
const widgetsTranslations: Record<string, Record<Language, string>> = {
  ...generalWidgetTranslations,
  ...navigationWidgetTranslations,
  ...userWidgetTranslations,
  ...tooltipWidgetTranslations
};

export default widgetsTranslations;
