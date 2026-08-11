export type Category = 'Leadership' | 'Product' | 'Systems' | 'Research';

export interface ArchiveFrame {
  no: string;
  name: string;
  frame: string;
  film: string;
  category: Category;
  image: string;
}

/** Brand-weighted 12-role archive — named cards keep a16z, BlockFi, Thesis*, Apple, Square. */
export const archive: ArchiveFrame[] = [
  { no: '/01', name: 'Vinyl Crate — Founder', frame: 'CS-01', film: 'JAN 2026 — PRESENT · REMOTE', category: 'Leadership', image: '/images/portfolio/mock-vinyl-crate.png' },
  { no: '/02', name: 'Poised — Design Leader', frame: 'CS-02', film: 'JAN 2018 — PRESENT · VENTURE STUDIO', category: 'Leadership', image: '/images/portfolio/mock-poised.png' },
  { no: '/03', name: 'Thesis* — Sr. Principal Product Designer', frame: 'CS-03', film: 'JUN 2025 — JUN 2026 · REMOTE', category: 'Product', image: '/images/portfolio/project-01-borrow.png' },
  { no: '/04', name: 'Thesis* — Sr. Design Systems & Ops Manager', frame: 'CS-04', film: 'JUN 2024 — JUN 2025 · REMOTE', category: 'Systems', image: '/images/portfolio/mock-thesis-systems.png' },
  { no: '/05', name: 'Andreessen Horowitz — Founding Head of Design', frame: 'CS-05', film: 'JUL 2022 — JUL 2024 · NEW YORK', category: 'Leadership', image: '/images/portfolio/mock-a16z.png' },
  { no: '/06', name: 'BlockFi — Director of Product Design', frame: 'CS-06', film: 'JUL 2020 — JUL 2022 · UNITED STATES', category: 'Leadership', image: '/images/portfolio/gf-blockfi.jpg' },
  { no: '/07', name: 'VNYLST — Founder, Head of Product & Design', frame: 'CS-07', film: '2013 — 2016 · LOS ANGELES', category: 'Leadership', image: '/images/portfolio/mock-vnylst.png' },
  { no: '/08', name: 'Ubiquiti Networks — Principal Mobile Product Designer', frame: 'CS-08', film: '2014 — 2015 · LOS ANGELES', category: 'Product', image: '/images/portfolio/mock-ubiquiti.png' },
  { no: '/09', name: 'Square Inc. — Product Insights Analyst', frame: 'CS-09', film: 'JUL 2012 — JUL 2013 · SAN FRANCISCO', category: 'Research', image: '/images/portfolio/mock-square.png' },
  { no: '/10', name: 'Apple — UX Researcher', frame: 'CS-10', film: 'JUN 2011 — JUN 2012 · UNITED STATES', category: 'Research', image: '/images/portfolio/mock-apple-research.png' },
  { no: '/11', name: 'Apple Genius', frame: 'CS-11', film: 'JUL 2008 — JUL 2011 · SAN FRANCISCO', category: 'Research', image: '/images/portfolio/mock-apple-genius.png' },
  { no: '/12', name: 'BBU Records — Label Manager & Art Director', frame: 'CS-12', film: '2005 — 2007 · LOS ANGELES', category: 'Product', image: '/images/portfolio/mock-bbu.png' },
];

/** Featured home track — gofractional extras live here alongside flagship roles. */
export const featured = [
  { name: 'Thesis* — BitcoinFi / Mezo', frame: 'CS-03', image: '/images/portfolio/project-hero-coinbase.png' },
  { name: 'BlockFi — Director of Product Design', frame: 'CS-06', image: '/images/portfolio/gf-blockfi.jpg' },
  { name: 'C@SH — Head of Design', frame: 'GF-01', image: '/images/portfolio/gf-cash.png' },
  { name: 'Fennel — Head of Design', frame: 'GF-02', image: '/images/portfolio/gf-fennel.png' },
  { name: 'Blinkist — Principal Designer', frame: 'GF-03', image: '/images/portfolio/gf-blinkist.jpg' },
  { name: 'Vinyl Crate — Founder', frame: 'CS-01', image: '/images/portfolio/mock-vinyl-crate.png' },
  { name: 'Poised — Design Leader', frame: 'CS-02', image: '/images/portfolio/mock-poised.png' },
  { name: 'Krisp.ai — Consultant', frame: 'GF-04', image: '/images/portfolio/gf-krisp.jpg' },
] as const;
