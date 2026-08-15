export const POISED_BASE = '/poised1';

export const site = {
  name: 'POISED',
  title: 'Poised — AI-Native Product Design Leadership',
  email: 'osandi@poised.design',
  booking: 'Open to early-stage teams',
  bookingLong: 'Open to early-stage teams — 2026',
  nav: [
    { no: '01', name: 'Home', desc: 'Twelve years of product design, front to back', to: POISED_BASE },
    { no: '02', name: 'Work', desc: 'Every role, filed & searchable', to: `${POISED_BASE}/work` },
    { no: '03', name: 'Project', desc: 'One product, as a case study', to: `${POISED_BASE}/project` },
    { no: '04', name: 'About', desc: 'Twelve years behind the practice', to: `${POISED_BASE}/about` },
  ],
  directory: {
    rooms: [
      {
        no: '01',
        name: 'Poised',
        desc: 'AI-native product design leadership — archive, project, about.',
        to: POISED_BASE,
      },
      {
        no: '02',
        name: 'Studio',
        desc: 'Workoholics — work, services, agency, culture.',
        to: '/studio',
      },
      {
        no: '03',
        name: 'Craft',
        desc: 'wild — craft, engineered. A point of view from Vienna.',
        to: '/craft',
      },
    ],
  },
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
    index: 'INDEX',
    build: 'BUILD GUIDE',
    studio: 'STUDIO',
  },
} as const;
