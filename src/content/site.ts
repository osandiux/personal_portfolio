export const site = {
  name: 'POISED',
  title: 'Poised — AI-Native Product Design Leadership',
  email: 'osandi@poised.design',
  booking: 'Open to early-stage teams',
  bookingLong: 'Open to early-stage teams — 2026',
  nav: [
    { no: '01', name: 'Home', desc: 'Twelve years of product design, front to back', to: '/' },
    { no: '02', name: 'Work', desc: 'Every role, filed & searchable', to: '/work' },
    { no: '03', name: 'Project', desc: 'One product, as a case study', to: '/project' },
    { no: '04', name: 'About', desc: 'Twelve years behind the practice', to: '/about' },
  ],
  footCta: {
    kicker: 'PARTNERSHIPS / 2026',
    titleA: "Let's",
    titleB: 'build',
    chips: ['Product Design', 'Design Systems', '0-to-1', 'Advisory'],
    action: 'Start a conversation',
  },
  footer: {
    copyright: 'POISED © 2026 · OSANDI ROBINSON',
    plates: 'IMAGERY: PRODUCT UI · BRAND PLATES',
    motto: 'BRIEFED, DESIGNED, SHIPPED',
  },
} as const;
