import { Link } from 'react-router-dom';
import { POISED_BASE, site } from '../../content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="footer-mark">
        {site.name} <span className="dot">●</span>
      </span>
      <span>{site.footer.copyright}</span>
      <span>{site.footer.plates}</span>
      <Link to="/" className="footer-build">
        {site.footer.index}
      </Link>
      <Link to={`${POISED_BASE}/build`} className="footer-build">
        {site.footer.build}
      </Link>
      <Link to="/studio" className="footer-build">
        {site.footer.studio}
      </Link>
      <span>{site.footer.motto}</span>
    </footer>
  );
}
