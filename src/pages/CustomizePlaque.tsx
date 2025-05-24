import { useParams } from 'react-router-dom';
import { t } from '../i18n';
import type { TranslationKeys } from '../types';

export default function CustomizePlaque() {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Ici on peut faire une fonction simple pour récupérer le nom traduit de la catégorie
  const getCategoryName = (id: string | undefined) => {
    if (!id) return '';
    switch (id) {
      case 'funeral': return t('category_funeral');
      case 'medal': return t('category_medal');
      case 'pet_medal': return t('category_pet_medal');
      case 'gift': return t('category_gift');
      case 'address': return t('category_address');
      default: return id;
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
        {t('customize_title').replace('{{category}}', getCategoryName(categoryId))}
      </h2>
      <p>{t('customize_instructions')}</p>
    </main>
  );
}
