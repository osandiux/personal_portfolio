export const about = {
  head: {
    label: 'ABOUT / TWELVE YEARS IN',
    titleA: 'Twelve years',
    titleB: 'behind the practice.',
    intro:
      'As the Zero-to-One design leader, I spearhead product design, research, content, and operations. This page is the person behind the archive.',
    name: 'OSANDI ROBINSON — UNITED STATES',
  },
  develop: {
    phases: ['THE BRIEF', 'THE ITERATION', 'THE SHIP'],
    titleA: 'The practice',
    titleB: 'develops.',
    copy: 'Every role in this archive started as a brief and came out the other side as a shipped product. Scroll, and watch the process the same way.',
    hint: 'SCROLL — BRIEF → ITERATION → SHIP',
    image: '/images/osandi-portrait-anime.png',
  },
  bio: {
    kicker: 'The short version',
    paras: [
      'I create the conditions that let design teams do their best work, then measure whether those conditions actually mattered to the people who used it.',
      'I pursue high-ambiguity environments, building the function and the operational infrastructure that takes a product from vision to traction — and I\'m currently building with AI agents as direct collaborators.',
    ],
    stats: [
      { value: '12+', caption: 'Years in product design' },
      { value: '9', caption: 'Companies & ventures' },
      { value: '2', caption: 'Founder roles' },
      { value: '$200M+', caption: 'TVL delivered' },
    ],
  },
  timeline: {
    kicker: 'The route so far',
    title: 'One line, twelve years.',
    stops: [
      {
        year: '2008',
        title: 'Apple Genius',
        note: 'Hands-on repair and diagnostics across Apple Retail — 86% NPS, the highest in the Bay Area region.',
      },
      {
        year: '2012',
        title: 'Square Inc.',
        note: 'User research for Square Wallet ahead of a 2015 IPO and $15B in annual payment volume.',
      },
      {
        year: '2016',
        title: 'VNYLST + Ubiquiti',
        note: 'Founded a peer-to-peer commerce app while leading mobile product design at Ubiquiti Networks.',
      },
      {
        year: '2018',
        title: 'Founded Poised',
        note: 'A design practice and venture studio built on one thesis: operate like the startups it serves.',
      },
      {
        year: '2022',
        title: 'Andreessen Horowitz',
        note: "Founding Head of Design on a stealth crypto project for the firm's portfolio.",
      },
      {
        year: '2026',
        title: 'Now — Thesis* & Vinyl Crate',
        note: 'Shipped the BitcoinFi suite to $200M+ TVL, and building an AI-native vinyl marketplace next.',
      },
    ],
  },
  kit: {
    kicker: 'The kit',
    rows: [
      { k: 'Craft', v: 'Figma · FigJam · Framer' },
      { k: 'Systems', v: 'Design tokens · Figma-to-code · WCAG 2.2' },
      { k: 'AI', v: 'Agentic workflows · Cursor · research synthesis' },
      { k: 'Research', v: 'Field studies · heuristic eval · surveys' },
      { k: 'Ops', v: 'Cycle planning · KRs · SLAs' },
      { k: 'Code', v: 'React · React Native' },
    ],
    clientsLabel: 'Selected companies',
    clients: [
      'Apple',
      'Square',
      'BlockFi',
      'Andreessen Horowitz',
      'Thesis*',
      'Blinkist',
      'Fennel',
      'Ubiquiti Networks',
      'VNYLST',
      'Krisp.ai',
    ],
  },
} as const;
