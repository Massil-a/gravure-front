import { t } from '../i18n';
import { useNavigate } from 'react-router-dom';

type Category = {
  id: string;
  titleKey: string;
  image: string;
};

const categories: Category[] = [
  {
    id: 'funeral',
    titleKey: 'category_funeral',
    image: '/images/funeral.jpg',
  },
  {
    id: 'medal',
    titleKey: 'category_medal',
    image: '/images/medal.jpg',
  },
  {
    id: 'pet_medal',
    titleKey: 'category_pet_medal',
    image: '/images/pet_medal.jpg',
  },
  {
    id: 'wine',
    titleKey: 'category_wine',
    image: '/images/wine.jpg',
  },
  {
    id: 'gift',
    titleKey: 'category_gift',
    image: '/images/gift.jpg',
  },
  {
    id: 'address',
    titleKey: 'category_address',
    image: '/images/address.jpg',
  },
];

export default function ChoosePlaque() {
  const navigate = useNavigate();

  function handleSelect(id: string) {
    navigate(`/customize/${id}`);
  }

  return (
    <main style={{ maxWidth: 1000, margin: '3rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', marginBottom: 24 }}>
        {t('choose_title')}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24,
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
              boxShadow: '0 4px 10px rgb(0 0 0 / 0.1)',
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgb(0 0 0 / 0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 10px rgb(0 0 0 / 0.1)';
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
