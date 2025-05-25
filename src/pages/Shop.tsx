import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  image: string;
  name: string;
  price: string;
  sold_price?: string;
  stock: number;
  description: string;
  size: string;
  tags: string[];
};

const fakeProducts: Product[] = [
  {
    id: '1',
    image: 'https://picsum.photos/1000/1000?1',
    name: 'Plaque hommage Félix',
    price: '40€',
    sold_price: '30€',
    stock: 10,
    description: 'Une plaque commémorative en hommage aux animaux disparus.',
    size: '10x5cm',
    tags: ['animal', 'commemorative']
  },
  {
    id: '2',
    image: 'https://picsum.photos/1000/1000?2',
    name: 'Plaque cadeau luxe',
    price: '60€',
    stock: 2,
    description: 'Un cadeau unique et personnalisé.',
    size: '15x10cm',
    tags: ['gift']
  },
  {
    id: '3',
    image: 'https://picsum.photos/1000/1000?3',
    name: 'Médaille personnalisable',
    price: '25€',
    sold_price: '20€',
    stock: 5,
    description: 'Parfaite pour les concours sportifs ou événements.',
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

  const filteredProducts = selectedTags.length === 0
    ? fakeProducts
    : fakeProducts.filter(p => selectedTags.every(tag => p.tags.includes(tag)));

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleBuyNow = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>
        {t('menu_shop')}
      </h2>

      <section style={{ marginBottom: '2rem' }}>
        <strong>{t('filters')}:</strong>
        <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: '0.4rem 1rem',
                backgroundColor: selectedTags.includes(tag) ? '#000' : '#eee',
                color: selectedTags.includes(tag) ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t(`tag_${tag}`)}
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              onClick={() => navigate(`/shop/${product.id}`)}
              style={{
                width: '100%',
                height: 260,
                objectFit: 'cover',
                cursor: 'pointer'
              }}
            />
            <div style={{ padding: '1rem', flexGrow: 1 }}>
              <h3
                onClick={() => navigate(`/shop/${product.id}`)}
                style={{
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: '0.5rem'
                }}
              >
                {product.name}
              </h3>
              <p style={{ color: '#555', marginBottom: '0.5rem' }}>{product.description}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{t('size')}: {product.size}</p>
              <p style={{ margin: '0.5rem 0' }}>
                {product.sold_price ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '0.5rem' }}>
                      {product.price}
                    </span>
                    <strong>{product.sold_price}</strong>
                  </>
                ) : (
                  <strong>{product.price}</strong>
                )}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    marginRight: '0.5rem',
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  {t('add_to_cart')}
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  {t('buy_now')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
