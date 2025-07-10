import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './locales/en';
import he from './locales/he';

const i18n = new I18n({
  en,
  he,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';
i18n.locale = Localization.getLocales()[0]?.languageCode || 'en';

export default i18n; 