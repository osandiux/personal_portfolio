export const hero = {
  label: 'ZERO-TO-ONE DESIGN LEADER — EX: APPLE, SQUARE, A16Z',
  count: '12+ YRS · EST. 2018',
  title: 'POISED ARCHIVE',
  desc: 'As the Zero-to-One design leader, I spearhead product design, research, content, and operations — nurturing the conditions that let teams ship excellence. Twelve years filed the way it happened: numbered, dated, and kept.',
  hint: 'SCROLL TO DEVELOP — CASE STUDY BELOW',
  backdrop: '/images/portfolio/mezo-hero.png',
  cells: [
    '/images/portfolio/mezo-borrow.png',
    '/images/portfolio/gf-blockfi.jpg',
    '/images/portfolio/gf-cash.png',
    '/images/portfolio/gf-fennel.png',
    '/images/portfolio/gf-blinkist.jpg',
    '/images/portfolio/mock-vinyl-crate.png',
    '/images/portfolio/gf-krisp.jpg',
  ],
} as const;

export const roll = {
  kicker: 'CASE 03 / 12 — SELECTED',
  meta: 'THESIS* · MEZO BITCOINFI SUITE',
  title: 'The BitcoinFi Suite',
  sub: 'JUN 2025 — JUN 2026 · $200M+ TVL · 25K+ USERS',
  desc: 'Four product surfaces — MUSD borrowing, swaps, vault deposits, and marketplace — designed to validate the circular Bitcoin economy, with AI accelerating research synthesis across all of them.',
  stage: '/images/portfolio/mezo-borrow.png',
  angles: [
    { no: '02', image: '/images/portfolio/mezo-wallet.png' },
    { no: '03', image: '/images/portfolio/mezo-explore.png' },
    { no: '04', image: '/images/portfolio/mezo-hero.png' },
  ],
} as const;

export const aboutTeaser = {
  label: 'THE DESIGNER / BEHIND POISED',
  titleA: 'Twelve years',
  titleB: 'shipping product',
  lede: 'I work at the intersection of design and organizational infrastructure — building the conditions that let design teams do their best work, then measuring whether those conditions actually mattered. Currently building with AI agents as direct collaborators on top of 12+ years of experience.',
  portrait: '/images/osandi-portrait-anime.png',
  stats: [
    { value: '12+', caption: 'Years in product design' },
    { value: '9', caption: 'Companies & ventures' },
    { value: '$200M+', caption: 'TVL delivered' },
  ],
  cta: 'Read the full story',
} as const;

export const recognition = {
  label: 'RECOGNITION / SELECTED PRESS',
  quoteA: '“Transformative design leadership,',
  quoteB: 'recognized by the C-suite and lead investors.”',
  source: 'Andreessen Horowitz — Portfolio Note',
  press: ['Apple', 'Square', 'BlockFi', 'Andreessen Horowitz', 'Thesis*', 'Blinkist', 'Fennel', 'Business Insider', 'Ubiquiti Networks'],
} as const;

export const journalTeaser = {
  label: 'JOURNAL / FIELD NOTES',
  title: 'Notes between roles.',
  notes: [
    { date: '12.06.2026', title: 'AI agents as direct design collaborators', tag: 'AI' },
    { date: '28.04.2026', title: 'Why design systems compress timelines', tag: 'Systems' },
    { date: '03.02.2026', title: 'Scaling a team 200% without losing craft', tag: 'Leadership' },
    { date: '19.12.2025', title: 'Designing for zero-loss lending', tag: 'Fintech' },
    { date: '07.11.2025', title: 'From the Genius Bar to venture design', tag: 'Career' },
    { date: '22.09.2025', title: 'Building Vinyl Crate in public', tag: 'Founder' },
  ],
} as const;
