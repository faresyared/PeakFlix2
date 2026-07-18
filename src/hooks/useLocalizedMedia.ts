import { useTranslation } from 'react-i18next';
import type { MediaItem } from '../types/media';

export function useLocalizedMedia() {
  const { i18n } = useTranslation();
  const ar = i18n.resolvedLanguage === 'ar';
  return {
    ar,
    title: (item: MediaItem) => ar ? item.titleAr : item.title,
    description: (item: MediaItem) => ar ? item.descriptionAr : item.description,
  };
}
