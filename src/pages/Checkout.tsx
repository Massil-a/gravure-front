import { useState } from 'react';
import { getCart, clearCart } from '../lib/cart';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cart = getCart();

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || cart.length === 0) {
      setError('Veuillez remplir votre nom, email et ajouter au moins une plaque au panier.');
      return;
    }

    // Ici, on ferait un fetch POST vers l'API backend, ex :
    /*
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, notes, plaques: cart }),
    })
    */

    // Simuler la commande validée
    alert('Commande reçue, merci !');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Votre panier est vide.</p>;
  }

  return (
    <div className="container" style={{ maxWidth: 500, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '1rem' }}>Votre commande</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Nom complet*:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>

      <label>
        Email*:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>

      <label>
        Adresse de livraison:
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>

      <label>
        Notes (optionnel):
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: 12, backgroundColor: '#000', color: '#fff', fontWeight: 'bold', borderRadius: 4 }}
      >
        Valider la commande
      </button>
    </div>
  );
}
