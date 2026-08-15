import { Link } from 'react-router-dom';
import { studioNav } from './content';

export function Footer() {
  return (
    <footer className="wkhs-footer" id="wkhs-footer">
      <span className="wkhs-footer__intersection-ref" aria-hidden="true" />
      <div className="wkhs-footer__top">
        <div className="wkhs-footer__top-start">
          <div className="wkhs-footer__contact">
            <div className="wkhs-footer__heading">Visit us</div>
            <address>Done Bikendi Plaza 2, 1.a, 48001</address>
            <div>Based in Bilbao</div>
          </div>
        </div>
        <div className="wkhs-footer__top-between">
          <nav className="wkhs-footer__nav">
            <div className="wkhs-footer__heading">Navigate</div>
            <ul>
              {studioNav.map((item) => (
                <li key={item.to}>
                  <Link className="link link--hover-underline" to={item.to}>
                    <span className="link__inner">
                      <span className="link__text">{item.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <a className="link link--hover-underline" href="#wkhs-footer">
                  <span className="link__inner">
                    <span className="link__text">Contact</span>
                  </span>
                </a>
              </li>
              <li>
                <a className="link link--hover-underline" href="https://wip.workoholics.es/">
                  <span className="link__inner">
                    <span className="link__text">Wip 2026</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="wkhs-footer__top-end">
          <nav className="wkhs-footer__social">
            <div className="wkhs-footer__heading">Connect</div>
            <ul>
              <li>
                <a className="link link--hover-underline" href="https://www.instagram.com/workoholics_/">
                  <span className="link__inner">
                    <span className="link__text">Instagram</span>
                  </span>
                </a>
              </li>
              <li>
                <a className="link link--hover-underline" href="https://www.tiktok.com/@workoholics_">
                  <span className="link__inner">
                    <span className="link__text">Tiktok</span>
                  </span>
                </a>
              </li>
              <li>
                <a className="link link--hover-underline" href="https://es.linkedin.com/company/workoholics">
                  <span className="link__inner">
                    <span className="link__text">LinkedIn</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="wkhs-footer__bottom">
        <div className="wkhs-footer__bottom-start">
          <img src="/studio/svg/logo.svg" alt="Workoholics" />
        </div>
        <div className="wkhs-footer__bottom-end">
          <nav className="wkhs-footer__legal">
            <ul>
              <li>
                <Link className="link link--hover-underline" to="/">
                  <span className="link__inner">
                    <span className="link__text">Index</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="wkhs-footer__scroll-to-top">
            <button
              type="button"
              className="button button--clear button--icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="button__inner">
                <span className="button__text">Back to top</span>
                <span className="button__icon">
                  <img src="/studio/svg/arrow-up.svg" alt="" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
