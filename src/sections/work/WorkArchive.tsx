import { useState } from 'react';
import { Link } from 'react-router-dom';
import { archive, type Category } from '../../content/archive';
import { Chip, Eyebrow, MediaFrame, MonoText, Title } from '../../components/primitives';
import './work.css';

const CATEGORIES: Category[] = ['Leadership', 'Product', 'Systems', 'Research'];
type View = 'grid' | 'ledger';

export function WorkArchive() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [view, setView] = useState<View>('grid');

  const frames = filter === 'All' ? archive : archive.filter((f) => f.category === filter);

  return (
    <>
      <section className="work-head" aria-label="The complete archive">
        <Eyebrow>WORK / THE COMPLETE ARCHIVE</Eyebrow>
        <Title as="h1" size="xl" className="work-head-title">
          <span className="line">Every</span>
          <span className="line title-accent">role.</span>
        </Title>
        <p className="work-intro">
          Twelve years of product design leadership, filed and searchable. Browse the archive as a contact grid or a ledger — from Vinyl Crate and Thesis* to Apple, Square, and a16z.
        </p>
        <MonoText>12 ROLES · BRAND-WEIGHTED · 2005—2026</MonoText>

        <div className="work-tools">
          <div className="work-filters" role="group" aria-label="Filter by category">
            <Chip active={filter === 'All'} onClick={() => setFilter('All')}>
              All
            </Chip>
            {CATEGORIES.map((cat) => (
              <Chip key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
                {cat}
              </Chip>
            ))}
          </div>

          <div className="work-view">
            <MonoText>
              Showing {frames.length} / {archive.length}
            </MonoText>
            <div role="group" aria-label="View">
              <Chip active={view === 'grid'} onClick={() => setView('grid')}>
                Grid
              </Chip>{' '}
              <Chip active={view === 'ledger'} onClick={() => setView('ledger')}>
                Ledger
              </Chip>
            </div>
          </div>
        </div>
      </section>

      {view === 'grid' ? (
        <section key={`${filter}-grid`} className="work-grid" aria-label="Archive grid">
          {frames.map((frame) => (
            <Link key={frame.frame} to="/project" className="work-card">
              <MediaFrame src={frame.image} alt={frame.name} />
              <div className="work-card-meta">
                <span className="work-card-name">{frame.name}</span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section key={`${filter}-ledger`} className="work-ledger" aria-label="Archive ledger">
          {frames.map((frame) => (
            <Link key={frame.frame} to="/project" className="ledger-row">
              <span className="mono">{frame.no}</span>
              <span className="ledger-name">{frame.name}</span>
              <span className="mono">{frame.category}</span>
              <span className="mono">
                {frame.frame} · {frame.film}
              </span>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}
