import { useState } from 'react';
import { addToCart } from '../lib/cart';
import type { Plaque } from '../lib/cart'
import { v4 as uuidv4 } from 'uuid';

export default function PlaqueForm() {
  const [text, setText] = useState('');
  const [material, setMaterial] = useState('laiton');
  const [format, setFormat] = useState('petite');
  const [fixOption, setFixOption] = useState('adhésif');

  const handleSubmit = () => {
    if (!text.trim()) return alert('Veuillez entrer un texte à graver');

    const newPlaque: Plaque = {
      id: uuidv4(),
      text,
      material,
      format,
      fixOption,
    };

    addToCart(newPlaque);
    alert('Plaque ajoutée au panier');
    setText('');
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '1rem' }}>
        Personnalisez votre plaque
      </h2>

      <textarea
        placeholder="Texte à graver..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: 100, padding: 8, marginBottom: 12, fontSize: 16, fontFamily: "'Inter', sans-serif" }}
      />

      <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }}>
        <option value="laiton">Laiton</option>
        <option value="alu">Aluminium</option>
        <option value="plexi">Plexiglas</option>
      </select>

      <select value={format} onChange={(e) => setFormat(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }}>
        <option value="petite">Petite</option>
        <option value="moyenne">Moyenne</option>
        <option value="grande">Grande</option>
      </select>

      <select value={fixOption} onChange={(e) => setFixOption(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 20 }}>
        <option value="adhésif">Adhésif</option>
        <option value="vis">À visser</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', fontSize: '1rem', fontWeight: 'bold', borderRadius: 4 }}
      >
        Ajouter au panier
      </button>
    </div>
  );
}
