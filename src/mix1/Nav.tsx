import { NavLink } from 'react-router-dom';
import { mix1Nav } from './content';

export function Mix1Nav() {
  return (
    <header className="mix1-nav">
      <NavLink to="/mix1" className="mix1-nav__mark" end>
        Osandi
      </NavLink>
      <nav className="mix1-nav__links">
        {mix1Nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'is-on' : '')}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
