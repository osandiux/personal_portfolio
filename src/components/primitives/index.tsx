import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './primitives.css';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-tick" aria-hidden>
        ●
      </span>
      {children}
    </p>
  );
}

export function Title({
  as: Tag = 'h2',
  size = 'lg',
  children,
  className,
}: {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={`title title--${size}${className ? ` ${className}` : ''}`}>{children}</Tag>;
}

export function MonoText({
  children,
  tone,
  className,
}: {
  children: ReactNode;
  tone?: 'bright' | 'red';
  className?: string;
}) {
  return (
    <p className={`mono${tone ? ` mono--${tone}` : ''}${className ? ` ${className}` : ''}`}>{children}</p>
  );
}

export function Button({
  href,
  variant = 'primary',
  children,
}: {
  href: string;
  variant?: 'primary' | 'stroke';
  children: ReactNode;
}) {
  return (
    <a className={`btn btn--${variant}`} href={href}>
      {children}
    </a>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <span className="text-link-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}

export function Chip({
  children,
  active,
  onClick,
  pressed,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  pressed?: boolean;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        className={`chip${active ? ' is-active' : ''}`}
        onClick={onClick}
        aria-pressed={pressed ?? active}
      >
        {children}
      </button>
    );
  }
  return <span className={`chip${active ? ' is-active' : ''}`}>{children}</span>;
}

export function MediaFrame({
  src,
  alt = '',
  ratio,
  scrim,
  className,
}: {
  src: string;
  alt?: string;
  ratio?: string;
  scrim?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`media-frame${scrim ? ' media-frame--scrim' : ''}${className ? ` ${className}` : ''}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}

export function Stat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-caption">{caption}</div>
    </div>
  );
}

export function Quote({ lines, source }: { lines: readonly string[]; source?: string }) {
  return (
    <blockquote>
      <p className="quote">
        {lines.map((line) => (
          <span key={line} className="quote-line">
            {line}
          </span>
        ))}
      </p>
      {source ? <footer className="quote-source">{source}</footer> : null}
    </blockquote>
  );
}

export function Marquee({ items }: { items: readonly string[] }) {
  const set = (key: string, hidden: boolean) => (
    <div className="marquee-set" key={key} aria-hidden={hidden}>
      {items.map((item) => (
        <span key={item}>
          {item} <span className="marquee-dot"> ●</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {set('a', false)}
        {set('b', true)}
      </div>
    </div>
  );
}

export function NoteCard({ date, title, tag }: { date: string; title: string; tag: string }) {
  return (
    <div className="note-card">
      <span className="mono">{date}</span>
      <span className="note-card-title">{title}</span>
      <span className="chip">{tag}</span>
    </div>
  );
}
