import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = item.sold_price || item.price;
    return sum + parseFloat(price) * item.quantity;
  }, 0);

  return (
    <main style={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h2>Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: 100, height: 100 }} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Quantité : {item.quantity}</p>
                  <p>Prix unitaire : {item.sold_price || item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Retirer</button>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <p>Total : {total.toFixed(2)}€</p>
          <button onClick={clearCart}>Vider le panier</button>
        </>
      )}
    </main>
  );
}
