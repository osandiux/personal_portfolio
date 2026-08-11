import { Link } from 'react-router-dom';
import { site } from '../../content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="footer-mark">
        {site.name} <span className="dot">●</span>
      </span>
      <span>{site.footer.copyright}</span>
      <span>{site.footer.plates}</span>
      <Link to="/build" className="footer-build">
        {site.footer.build}
      </Link>
      <span>{site.footer.motto}</span>
    </footer>
  );
}
