import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { t } from '../i18n';

const fakeProducts = [
  {
    id: '1',
    image: 'https://picsum.photos/1000/1000',
    name: 'Felix Tribute Plaque',
    price: '40€',
    sold_price: '30€',
    stock: 10,
    description: 'A commemorative plaque for beloved pets.',
    size: '10x5cm',
    tags: ['animal', 'commemorative']
  },
  {
    id: '2',
    image: 'https://picsum.photos/1000/1000',
    name: 'Luxury Gift Plaque',
    price: '60€',
    sold_price: '',
    stock: 2,
    description: 'A unique and personalized gift.',
    size: '15x10cm',
    tags: ['gift']
  },
  {
    id: '3',
    image: 'https://picsum.photos/1000/1000',
    name: 'Custom Medal',
    price: '25€',
    sold_price: '20€',
    stock: 5,
    description: 'Perfect for sports competitions or events.',
    size: '5cm',
    tags: ['medal', 'gift']
  }
];

const allTags = ['animal', 'commemorative', 'gift', 'medal'];

export default function Shop() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts =
    selectedTags.length === 0
      ? fakeProducts
      : fakeProducts.filter(p =>
          selectedTags.every(tag => p.tags.includes(tag))
        );

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>{t('shop_title' as any)}</h2>

      <section style={{ marginBottom: '1.5rem' }}>
        <strong>{t('filters_label' as any)}: </strong>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{
              margin: '0 0.5rem 0.5rem 0',
              padding: '0.5rem 1rem',
              background: selectedTags.includes(tag) ? '#000' : '#eee',
              color: selectedTags.includes(tag) ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tag}
          </button>
        ))}
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fafafa',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s'
            }}
            onClick={() => navigate(`/shop/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
            />
            <h3 style={{ marginTop: '1rem' }}>{product.name}</h3>
            <p>{product.size}</p>
            <p>
              {product.sold_price ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      marginRight: '0.5rem'
                    }}
                  >
                    {product.price}
                  </span>
                  <strong>{product.sold_price}</strong>
                </>
              ) : (
                <strong>{product.price}</strong>
              )}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart({ ...product, quantity:1 });
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#333',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {t('add_to_cart' as any)}
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart({ ...product, quantity:1 });
                  navigate('/cart');
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: '1px solid #333',
                  backgroundColor: '#fff',
                  color: '#333',
                  cursor: 'pointer'
                }}
              >
                {t('buy_now' as any)}
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
