import { useCart } from '../context/CartContext';
import { t } from '../i18n';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: "'Inter', sans-serif" }}>
      {t('cart_empty')}
    </p>;
  }

  cart.map(item=>{
    console.log(item)
  })

  const priceMap: Record<string, number> = {
    petite: 25,
    moyenne: 40,
    grande: 60,
  };

  const totalPrice = cart.reduce((sum, item) => {
    const format = item.format ?? 'petite';
    return sum + (priceMap[format] || 0) * (item.quantity ?? 1);
  }, 0);

  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      fontFamily: "'Inter', sans-serif",
      color: '#111',
      display: 'flex',
      gap: '2rem',
      padding: '1rem'
    }}>
      {/* Liste des articles */}
      <div style={{ flex: 3 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>
          {t('cart')}
        </h2>
        {cart.map(item => (
          <div key={item.id} style={{
            borderBottom: '1px solid #ccc',
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p><strong>{t('name')}:</strong> {item.name}</p>
              <p><strong>{t('description')}:</strong> {item.description}</p>
              <p><strong>{t('size')}:</strong> {item.size}</p>
              <p><strong>{t('price')}:</strong> {item.price}</p>
              {item.sold_price && <p><strong>{t('sold_price')}:</strong> {item.sold_price}</p>}
              <p><strong>{t('quantity')}:</strong> {item.quantity ?? 1}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #111',
                color: '#111',
                padding: '0.4rem 0.8rem',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              {t('remove')}
            </button>
          </div>
        ))}
        <button
          onClick={clearCart}
          style={{
            marginTop: '1rem',
            backgroundColor: '#111',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.2rem',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {t('clear_cart')}
        </button>
      </div>

      {/* Récapitulatif à droite */}
      <div style={{
        flex: 1,
        borderLeft: '1px solid #ccc',
        paddingLeft: '1rem',
        fontSize: '1.1rem',
        color: '#222'
      }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>{t('order_summary')}</h3>
        <p>{t('total_items')}: {cart.reduce((acc, i) => acc + (i.quantity ?? 1), 0)}</p>
        <p>{t('total_price')}: {totalPrice} €</p>
        <button style={{
          marginTop: '2rem',
          width: '100%',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          padding: '1rem',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          borderRadius: 4,
          cursor: 'pointer'
        }}>
          {t('checkout')}
        </button>
      </div>
    </div>
  );
}
