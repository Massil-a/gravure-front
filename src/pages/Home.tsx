import { t } from '../i18n';
import { useNavigate } from 'react-router-dom';
import type { TranslationKeys } from '../types';

type Category = {
  id: string;
  titleKey: TranslationKeys;
  image: string;
};

const categories: Category[] = [
  { id: 'funeral', titleKey: 'category_funeral', image: '/images/categories/funeral.jpg' },
  { id: 'medal', titleKey: 'category_medal', image: '/images/categories/medal.jpg' },
  { id: 'pet_medal', titleKey: 'category_pet_medal', image: '/images/categories/pet_medal.jpg' },
  { id: 'gift', titleKey: 'category_gift', image: '/images/categories/gift.jpg' },
  { id: 'address', titleKey: 'category_address', image: '/images/categories/address.jpg' },
];

export default function Home() {
  const navigate = useNavigate();

  function handleSelect(id: string) {
    navigate(`/customize/${id}`);
  }

  return (
    <main
      style={{
        fontFamily: "'Playfair Display', serif",
        maxWidth: 1000,
        margin: '3rem auto',
        padding: '0 1rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('hero_title')}</h1>
      <p style={{ fontSize: '1.3rem', marginBottom: '2rem', color: '#555' }}>
        {t('hero_subtitle')}
      </p>
      <button
        onClick={() => navigate('/choose')}
        style={{
          backgroundColor: '#222',
          color: 'white',
          border: 'none',
          padding: '0.8rem 2rem',
          fontSize: '1.1rem',
          cursor: 'pointer',
          borderRadius: 6,
          marginBottom: 40,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {t('btn_order')}
      </button>

      <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>{t('choose_title')}</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24,
          cursor: 'default',
        }}
      >
        {categories.map(({ id, titleKey, image }) => (
          <div
            key={id}
            onClick={() => handleSelect(id)}
            style={{
              cursor: 'pointer',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={image}
              alt={t(titleKey)}
              style={{ width: '100%', height: 140, objectFit: 'cover' }}
            />
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '600',
                fontSize: 18,
                padding: '0.75rem 1rem',
                margin: 0,
                backgroundColor: '#fafafa',
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              {t(titleKey)}
            </h3>
          </div>
        ))}
      </div>
    </main>
  );
}
