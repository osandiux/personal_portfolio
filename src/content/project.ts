export const project = {
  open: {
    kicker: 'CASE 03 / 12 — CASE STUDY',
    coords: '$200M+ TVL / 25K+ USERS',
    category: 'FINTECH · CRYPTO — THESIS* / MEZO',
    titleA: 'The BitcoinFi',
    titleB: 'Suite.',
    sub: 'Four product surfaces, one thesis: prove the circular Bitcoin economy works — borrow, swap, earn, and spend without selling your BTC.',
    image: '/images/portfolio/project-hero-coinbase.png',
  },
  brief: {
    kicker: 'The brief',
    lines: ['Four surfaces, one team, and an AI-accelerated research loop to ship a thesis, not just a feature.'],
    specs: [
      { k: 'Role', v: 'Sr. Principal Product Designer' },
      { k: 'Company', v: 'Thesis* · Mezo' },
      { k: 'Surfaces', v: 'Borrowing · Swaps · Vaults · Marketplace' },
      { k: 'Timeline', v: 'Jun 2025 — Jun 2026' },
      { k: 'TVL', v: '$200M+' },
      { k: 'Users', v: '25K+' },
    ],
  },
  stillOne: {
    caption: 'MUSD-01 · Borrow securely, spend confidently',
    index: '01',
    image: '/images/portfolio/project-01-borrow.png',
  },
  twoUp: {
    caption: 'MUSD-02 / WALLET-03 · Loan status & portfolio',
    index: '02 — 03',
    images: [
      { src: '/images/portfolio/project-02-loan.png', alt: 'Active loan status — LTV, MUSD balance, liquidation buffer' },
      { src: '/images/portfolio/project-03-wallet.png', alt: 'Wallet overview — BTC, MUSD, and vault positions' },
    ],
  },
  beforeAfter: {
    kicker: 'The process / drag to compare',
    title: 'From flow to shipped product',
    beforeLabel: 'Early flow',
    afterLabel: 'Shipped product',
    beforeImage: '/images/portfolio/mock-early-flow.png',
    afterImage: '/images/portfolio/project-after-coinbase.png',
  },
  stillTwo: {
    caption: 'EXPLORE-04 · Marketplace & earn, at scale',
    index: '04',
    image: '/images/portfolio/project-04-marketplace.png',
  },
  sheet: {
    kicker: 'The flow sheet',
    title: 'Eight surfaces.',
    hint: 'CLICK TO ENLARGE',
    frames: [
      { frame: 'BORROW', image: '/images/portfolio/project-01-borrow.png' },
      { frame: 'LOAN', image: '/images/portfolio/project-02-loan.png' },
      { frame: 'WALLET', image: '/images/portfolio/project-03-wallet.png' },
      { frame: 'EARN', image: '/images/portfolio/project-04-marketplace.png' },
      { frame: 'HERO', image: '/images/portfolio/project-hero-coinbase.png' },
      { frame: 'SHIPPED', image: '/images/portfolio/project-after-coinbase.png' },
      { frame: 'EARLY', image: '/images/portfolio/mock-early-flow.png' },
      { frame: 'BLOCKFI', image: '/images/portfolio/gf-blockfi.jpg' },
    ],
  },
  quote: {
    lines: ['“The best conditions for a team', 'are the ones you can measure —', 'not just the ones that feel right.”'],
  },
  next: {
    kicker: 'Next case',
    title: 'BlockFi — Bitcoin Rewards Card',
    image: '/images/portfolio/gf-blockfi.jpg',
  },
} as const;
