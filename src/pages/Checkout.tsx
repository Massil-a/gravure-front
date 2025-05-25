import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { t } from '../i18n';

export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || cart.length === 0) {
      setError(t('checkout_error'));
      return;
    }

    // Ici on enverrait la commande à l'API
    /*
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, notes, cart }),
    })
    */

    alert(t('order_success'));
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: "'Inter', sans-serif" }}>
        {t('cart_empty')}
      </p>
    );
  }

  return (
    <div style={{
      maxWidth: 600,
      margin: '2rem auto',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
      color: '#111'
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2rem',
        marginBottom: '1rem'
      }}>
        {t('checkout')}
      </h2>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        {t('full_name')}*:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        Email*:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        {t('shipping_address')}:
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        {t('notes')}:
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
      </label>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#111',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        {t('place_order')}
      </button>
    </div>
  );
}
