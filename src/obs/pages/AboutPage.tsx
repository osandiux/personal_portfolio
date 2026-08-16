import { useState } from 'react';
import { AWARDS, EMAIL, PRESS, SOCIALS, SPEECHES } from '../content';

export function AboutPage() {
  const [founder, setFounder] = useState<0 | 1 | null>(null);

  return (
    <main className="obs-about">
      <section className="obs-about__hero">
        <div className="obs-about__copy">
          <p>
            Obys is a concept-driven design studio founded by{' '}
            <u onMouseEnter={() => setFounder(1)} onMouseLeave={() => setFounder(null)}>
              Olha Olianishyna
            </u>{' '}
            and{' '}
            <u onMouseEnter={() => setFounder(0)} onMouseLeave={() => setFounder(null)}>
              Viacheslav Olianishyn
            </u>{' '}
            in 2018 and based in the EU (AMS, WAW, BER).
          </p>
          <p>
            Rooted in modernist design principles and graphic design tradition, our work combines typography, grid
            systems and motion to create digital experiences that balance clarity, usability and bold visual expression.
          </p>
          <p>
            Our team remains intentionally small, under 10 people, which allows creative direction to stay personal and
            decisions to stay sharp. Every project is led closely by the founders. No layers. No dilution.
          </p>
        </div>
        <aside className={`obs-about__photo${founder !== null ? ' is-on' : ''}`}>
          <img
            src={
              founder === 1
                ? 'https://cms.obys.agency/uploads/small_Olha_Olianishyna_daa86dc654.webp'
                : 'https://cms.obys.agency/uploads/small_Viacheslav_Olianishyn_4a08c4c093.webp'
            }
            alt={founder === 1 ? 'Olha Olianishyna (Creative Director)' : 'Viacheslav Olianishyn (Design Director)'}
          />
          {founder !== null ? (
            <span>{founder === 1 ? 'Olha Olianishyna (Creative Director)' : 'Viacheslav Olianishyn (Design Director)'}</span>
          ) : null}
        </aside>
      </section>

      <section className="obs-about__body">
        <p>
          Over the years, our work has grown from independent collaborations to partnerships with brands such as CNN,
          Porsche, Hilton, Miro, Makhno and Glyphic Biotechnologies.
        </p>
        <p>
          Along the way, Obys was named Studio of the Year by Awwwards in 2023, received 4× Studio of the Year titles
          from CSS Design Awards, and earned Red Dot recognition — not as an objective, but as a reflection of consistent
          standards.
        </p>
        <p>
          We live design daily, not only through client work, but through research, experimentation, public talks and
          education. Obys takes on a limited number of projects each year, partnering with marketing leaders and founders
          who value authorship, clarity and long-term brand impact.
        </p>
      </section>

      <section className="obs-about__cols">
        <div>
          <h2>Services:</h2>
          <p>Creative Direction, Web Design, Web Development, Brand Identity, 3D, Motion Design, Lectures and Consulting</p>
          <h2>Industries:</h2>
          <p>Architecture, Fashion, Technology, Culture, Education, Finance, Automotive, Furniture</p>
          <h2>Selected Awards:</h2>
          <ul>
            {AWARDS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="obs-muted">and 60+ more...</p>
          <h2>Latest Public Speeches:</h2>
          <ul>
            {SPEECHES.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Featured Press:</h2>
          <ul>
            {PRESS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <h2>Socials:</h2>
          <ul>
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <h2>Typography:</h2>
          <p>OTF Obys NG by Obys</p>
        </div>
      </section>

      <footer className="obs-about__foot">
        <p>All rights reserved. ©2026 Obys</p>
        <p>
          The studio is shaped by people who care deeply about design and the process behind. Each project becomes a case
          study and a meaningful part of our portfolio, developed with care and attention.
        </p>
        <p>
          Contact:{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </footer>
    </main>
  );
}
