import { useEffect, useState } from 'react';
import type { Plaque } from '../lib/cart'
import { getCart, removeFromCart } from '../lib/cart';

export default function Cart() {
  const [cart, setCart] = useState<Plaque[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  if (cart.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Votre panier est vide.</p>;
  }

  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '1rem' }}>Votre panier</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(({ id, text, material, format, fixOption }) => (
          <li
            key={id}
            style={{
              border: '1px solid #ddd',
              padding: 12,
              marginBottom: 12,
              borderRadius: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <p><strong>Texte :</strong> {text}</p>
            <p><strong>Matériau :</strong> {material}</p>
            <p><strong>Format :</strong> {format}</p>
            <p><strong>Fixation :</strong> {fixOption}</p>
            <button
              onClick={() => handleRemove(id)}
              style={{ marginTop: 8, padding: 6, backgroundColor: '#c00', color: '#fff', borderRadius: 4 }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
