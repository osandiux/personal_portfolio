import { Link } from 'react-router-dom';
import { site } from '../content/site';
import { MediaBlocksToggle } from '../media-blocks/MediaBlocks';
import { WireframeToggle } from '../wireframe/Wireframe';
import './directory.css';

export function IndexPage() {
  return (
    <main className="directory">
      <div className="directory-toolbar">
        <MediaBlocksToggle />
        <WireframeToggle />
      </div>
      <nav className="directory-rooms" aria-label="Sites">
        {/*
          Reference rooms are recreations of other studios' sites, kept for
          internal reference only. They stay routable by direct URL but are not
          linked from here, and carry a noindex header (see vercel.json), so the
          public directory shows owned work only. Drop the filter to restore.
        */}
        {site.directory.rooms
          .filter((room) => !room.reference)
          .map((room) => (
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
