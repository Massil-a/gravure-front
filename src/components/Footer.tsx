import { t } from '../i18n';

export default function Footer() {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', marginTop: '4rem', borderTop: '1px solid #ccc' }}>
      {t('footer_text')}
    </footer>
  );
}
