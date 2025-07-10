import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './locales/en';
import he from './locales/he';

console.log("🟢 i18n.ts loading...");
console.log("🟢 Localization.getLocales():", Localization.getLocales());
console.log("🟢 English translations:", en);
console.log("🟢 Hebrew translations:", he);

const i18n = new I18n({
  en,
  he,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';
i18n.locale = Localization.getLocales()[0]?.languageCode || 'en';

console.log("🟢 i18n initialized with locale:", i18n.locale);
console.log("🟢 i18n default locale:", i18n.defaultLocale);
console.log("🟢 i18n fallback enabled:", i18n.enableFallback);

// Test some translations
console.log("🟢 Testing translations:");
console.log("🟢 goalTitle:", i18n.t('goalTitle'));
console.log("🟢 lose:", i18n.t('lose'));
console.log("🟢 maintain:", i18n.t('maintain'));
console.log("🟢 gain:", i18n.t('gain'));

export default i18n; 