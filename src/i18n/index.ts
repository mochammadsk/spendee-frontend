import en from '@/i18n/en.json';
import id from '@/i18n/id.json';
import { createI18n } from 'vue-i18n';

const SUPPORTED_LOCALES = ['id', 'en'] as const;

let savedLocale = localStorage.getItem('locale') || 'id';
if (!SUPPORTED_LOCALES.includes(savedLocale as any)) {
  savedLocale = 'id';
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    id,
  },
});

export default i18n;
