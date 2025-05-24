import { Link } from 'react-router-dom';
import { t } from '../i18n';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  return (
    <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
        Grav'Your
      </Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/shop">{t('menu_shop')}</Link>
        <Link to="/cart">{t('cart')}</Link>
        <LanguageSelector />
      </nav>
    </header>
  );
}
