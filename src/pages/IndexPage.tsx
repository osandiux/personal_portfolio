import { Link } from 'react-router-dom';
import { site } from '../content/site';
import { MediaBlocksToggle } from '../media-blocks/MediaBlocks';
import './directory.css';

export function IndexPage() {
  return (
    <main className="directory">
      <div className="directory-toolbar">
        <MediaBlocksToggle />
      </div>
      <nav className="directory-rooms" aria-label="Sites">
        {site.directory.rooms.map((room) => (
          <Link key={room.to} to={room.to} className="directory-room">
            <span className="directory-no">{room.no}</span>
            <span className="directory-name">{room.name}</span>
            <span className="directory-desc">{room.desc}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
