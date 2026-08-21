export const EMAIL = 'osandi.designs@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/osandi';
export const DECK = 'https://bit.ly/osandi_design_deck_2026';

export const mix1Nav = [
  { name: 'Work', to: '/mix1/work' },
  { name: 'About', to: '/mix1/about' },
] as const;

export const mix1Work = {
  title: 'Work',
  intro:
    'Leading for impact, then designing for it — org infrastructure, product surfaces, and the numbers that followed.',
  introLines: [
    'Leading for impact, then designing for it — org',
    'infrastructure, product surfaces, and the numbers',
    'that followed.',
  ],
  services: [
    { id: 'all', label: 'All' },
    { id: 'product', label: 'Product' },
    { id: 'systems', label: 'Systems' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'consultant', label: 'Consultant' },
  ],
  sectors: [
    { id: 'all', label: 'All' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'consumer', label: 'Consumer' },
    { id: 'ai', label: 'AI' },
  ],
  impact: [
    { org: 'BlockFi', value: '$50M', label: 'monthly revenue' },
    { org: 'BlockFi', value: '+200%', label: 'trades / 90 days' },
    { org: 'Mezo', value: '98%', label: 'sprint completion' },
    { org: 'Mezo', value: '$200M+', label: 'TVL · 25K+ users' },
    { org: 'a16z', value: '0 → 1', label: 'design function' },
    { org: 'Vinyl Crate', value: '$250K', label: 'dev cost saved' },
  ],
  items: [
    {
      name: 'Mezo Clay Design System',
      headline: 'Converting design debt into product infrastructure',
      desc: 'Led Mezo design system migration across three product phases (legacy, testnet, mainnet); post-launch audit established 70% component integration and identified systemic overrides from premature styling as the primary implementation bottleneck, informing governance decisions. Managed a direct report and an engineering contributor from execution through deployment. Partnered with the contributing designer to set quality standards and pattern library conventions, building out Uber Base into a React, WCAG 2.2-compliant library purpose-built for the Thesis BitcoinFi suite. Managed, built, and tested 2,000+ variants across 50+ base components, establishing the single source of truth every product surface shipped: the infrastructure behind $322M in testnet deposits, 154K transactions, and $151M TVL at mainnet, peaking at $200M+.',
      image: '/images/portfolio/mock-thesis-systems.png',
      service: 'systems',
      sector: 'crypto',
    },
    {
      name: 'Deposit on Mezo',
      headline: 'Improving the deposit flow that unlocked Mezo’s liquidity',
      desc: 'Depositing Bitcoin to Mezo wasn’t a standard transfer — users were bridging assets across chains into a protocol where a wrong address meant permanent loss of funds. Research confirmed the existing deposit flow was fundamentally broken — perceived as risky and confusing. The redesign introduced upfront deposit instructions, surfaced network context and minimum thresholds before commitment, and provided unambiguous success states so users knew their funds had arrived safely. The deposit flow became the primary on-ramp enabling liquidity for vaults, pools, and rewards — contributing to Mezo’s growth to $200M+ TVL.',
      image: '/images/portfolio/project-hero-coinbase.png',
      service: 'product',
      sector: 'crypto',
    },
    {
      name: 'Borrow MUSD on Mezo',
      headline: 'Making high-stakes borrowing feel safe, not complex',
      desc: 'MUSD borrowing required users to understand collateralization, liquidation risk, and variable APR simultaneously — concepts that had no mainstream equivalent. The design challenge wasn’t simplification for its own sake; it was making consequential financial decisions feel appropriately weighted without overwhelming users into inaction. The redesign introduced progressive disclosure, consolidated error handling to a single inline signal, and leaned on benchmarked design patterns to reduce DeFi complexity for a larger addressable market.',
      image: '/images/portfolio/project-01-borrow.png',
      service: 'product',
      sector: 'crypto',
    },
    {
      name: 'BlockFi Mobile',
      headline: 'Redefining mobile trading to drive 200%+ transaction volume in 90 days',
      desc: 'BlockFi’s mobile trading experience was scoped too narrowly — USD denomination was the surface problem, but the deeper opportunity was rebuilding the entire flow around how users actually trade. As Director, I pushed back on the original brief using product benchmarking and heuristic evaluation, moving buy/sell intent before the amount screen to eliminate a segmented control that was adding cognitive load, making room for surfacing recurring trades earlier in the flow — previously buried at the summary screen. Both decisions were validated through user testing before implementation, and applied consistently across web and mobile. Trades grew 200%+ within 90 days of launch — outpacing web-based trades for the first time — and contributed directly to BlockFi’s growth in service of 225K+ clients.',
      image: '/images/portfolio/gf-blockfi.jpg',
      service: 'leadership',
      sector: 'fintech',
    },
    {
      name: 'C@SH Native App',
      headline: 'Zero-to-one product design that informed a strategic pivot',
      desc: 'At an a16z Crypto portfolio company, I established the design function from zero — customizing Uber Base into a branded component library before a single internal designer was hired, doubling engineering speed and giving the team infrastructure to build with from day one. The VC principal set a high bar: a premium product resonating with an urban audience. We met it — validated through affinity testing — delivering a full light and dark mode experience. The same research surfaced a harder finding: the market hadn’t matured enough for a social wallet. That insight informed a strategic pivot, preserving capital that would otherwise have been burned against a product without sufficient traction.',
      image: '/images/portfolio/gf-cash.png',
      service: 'leadership',
      sector: 'crypto',
    },
    {
      name: 'EASI Food Delivery',
      headline: 'Rearchitecting EASI to win a second audience — and a $500M valuation',
      desc: 'EASI had a strong market position in Australian diaspora communities, but poor usability, frequent crashes, and a sub-3.0 App Store rating were capping their TAM. In six weeks, I used benchmarking to build stakeholder confidence for a full redesign, then rebuilt core ordering flow in parallel with engineering’s re-architecture — prototyping and testing each decision before handoff. App Store rating climbed from below 3.0 to 4.5 stars. EASI surpassed 1M+ users, reached a $500M+ valuation, and was acquired by HungryPanda in 2022 — whose acquisition rationale mirrored the market strategy the redesign was built around.',
      image: '/images/portfolio/gf-easi.jpg',
      service: 'consultant',
      sector: 'consumer',
    },
    {
      name: 'Krisp AI',
      headline: 'Product innovation for Krisp.ai’s noise cancelling desktop application',
      desc: 'Krisp had built strong utility as a consumer noise-cancellation tool, but the desktop experience hadn’t kept pace with what AI-native software was starting to look like. Engaged as principal design consultant, I redesigned the application around a modern UI system — introducing branded components to accelerate implementation, reduce design debt, and establish a visual foundation capable of scaling with the product. The engagement paused when COVID-19 created market uncertainty across the space. Krisp would later pivot into meeting intelligence and recording — a shift toward enterprise aesthetics and a design brief the original work wasn’t built to serve.',
      image: '/images/portfolio/gf-krisp.jpg',
      service: 'consultant',
      sector: 'ai',
    },
    {
      name: 'Zalando Stories',
      headline: 'One motion language for a platform built on a proven bet',
      desc: 'Zalando’s majority stake in Highsnobiety had already proven the model — 80+ curated drops reaching 7M+ unique users before the platform had a name. Turning that into a permanent feature meant solving motion first: every editorial format needed transitions that felt consistent across app and web, and motion was still a pile of one-off files. Led a design-sprint week to define a platform-agnostic system — timing and easing as shared tokens, composed into a primitive set (sheet, enter/exit, press, swipe-up) any format could adopt instead of reinventing. Stories launched Sept 14, 2023 across 11 markets with five formats, and has scaled to 500+ stories and 700+ brands since.',
      image: '/images/portfolio/gf-fennel.png',
      service: 'systems',
      sector: 'consumer',
    },
  ],
} as const;

export const mix1About = {
  title: 'About',
  intro:
    'I build the conditions for great product work — org infrastructure, delivery systems, and cross-functional standards that make design a measurable driver of business outcomes across 0→1 builds and iterative product evolution.',
  teamIntro: 'Osandi Sekoú Robinson — product & design leader.',
  teamBody:
    'Startup founder turned design executive with 14 years building products and the orgs that ship them — across fintech, crypto, and consumer mobile.',
  portrait: '/images/osandi-portrait-anime.png',
  capabilitiesFigure: '/images/portfolio/mock-poised.png',
  team: [{ name: 'Osandi Sekoú Robinson', role: 'Product & design leader' }],
  capabilities: [
    {
      no: '01',
      name: 'Product design · 14 years',
      items: [
        'Hands-on research and craft across fintech, crypto, and consumer mobile',
        '0→1 builds and iterative product evolution',
        'Shaped by data, business goals, and operational strategy',
      ],
    },
    {
      no: '02',
      name: 'Research & testing · 14 years',
      items: [
        'Test programs and UX research',
        'Adoption and engagement',
        'Center user needs throughout the product journey',
      ],
    },
    {
      no: '03',
      name: 'Design operations · 6 years',
      items: [
        'Delivery systems and discovery protocols',
        'Team leveling frameworks',
        '98% sprint completion',
        'Feature delivery compressed from 6+ weeks to 2 weeks',
      ],
    },
    {
      no: '04',
      name: 'AI-assisted design · 2 years',
      items: ['Claude API, MCP, and agentic systems', 'Hands-on enough to know where models fall short'],
    },
    {
      no: '05',
      name: 'Functional',
      items: [
        'Native, tablet, and web design',
        'Design operations & strategy',
        '0 to 1 product development',
        'Iterative design improvement',
        'User research, testing & insights',
        'Design systems & governance',
        'Team leveling, mentoring, & org scaling',
        'Cross functional alignment',
        'AI native product development',
        'Prototyping & validation standards',
      ],
    },
    {
      no: '06',
      name: 'Industries',
      items: [
        'Fintech, blockchain, & web3',
        'AI-native products & agents',
        'Consumer mobile',
        'B2B & developer tools',
        'E-commerce & marketplaces',
        'Video & audio streaming',
        'Web & native SaaS',
        'IoT & hardware',
        'Social & community',
        'Sports & entertainment',
      ],
    },
  ],
  process: [
    {
      name: 'Discover',
      copy: 'Discovery determines whether a team is solving the right problem before anyone commits to a solution. Widen the aperture before narrowing toward anything buildable. The output is alignment on the problem, the evidence needed, and why it matters to the business.',
      image: '/images/studio/agency-01-9b4387d5aa.webp',
      methods: [
        'Customer feedback',
        'Quant data analysis',
        'Lived observations',
        'Surveys & questionnaires',
        'Business analysis',
        'Interviews',
        'Market research',
        'Session replay',
        'Goal & signal statements',
        'Hypothesis generation',
      ],
    },
    {
      name: 'Explore',
      copy: 'With the evidential problem in sight, artifacts and written context align stakeholders — connecting hypotheses and objectives to human needs and business goals.',
      image: '/images/studio/agency-05-6ff4e85875.webp',
      methods: ['Diagram', 'Journey map', 'Wireframe', 'Prompt design & prototyping'],
    },
    {
      name: 'Validate',
      copy: 'Validation can occur at multiple touchpoints with an array of artifacts, ensuring the work addresses the needs of users — and, inevitably, the business.',
      image: '/images/studio/agency-06-c2c1790069.webp',
      methods: [
        'Card sorting',
        'Design reviews',
        'Usability testing',
        'Error rate analysis',
        'Business analysis',
        'Interviews',
        'Market research',
        'Session replay',
        'Goal & signal statements',
        'Hypothesis generation',
      ],
    },
    {
      name: 'Implement',
      copy: 'Collaborate closely with engineers for design alignment and capture details pre-release. For new components, ensure awareness for product consistency. Cross-functional stakeholders are informed via Loom and case-study briefs before final sign-off — including how we measure design intent.',
      image: '/images/studio/agency-07-a0986e9d3f.webp',
      methods: [
        'Feasibility sign-off',
        'Compliance sign-off',
        'Business sign-off',
        'Design QA',
        'Content sign-off',
        'Accessibility checklist',
        'Design-systems check-in',
        'Design guidelines',
        'Criteria sign-off',
        'Cross-functional review',
      ],
    },
  ],
  clients: ['Apple', 'Square', 'BlockFi', 'Andreessen Horowitz', 'Thesis*', 'Mezo', 'EASI', 'Fennel', 'Krisp.ai', 'Vinyl Crate'],
  seeking: 'Seeking design leadership roles where product, design, and engineering judgment equally matter.',
  contactLine: 'Got questions? Get in touch.',
} as const;

export const mix1Build = {
  title: 'Build',
  intro:
    'Mix1 is a mashup, not a rebuild — Craft’s home, Studio’s work and about, one spec for type and inset, and a short list of things we refused to Studio-wash away.',
  what: {
    kicker: '01 / Mashup',
    title: 'What mix1 is',
    body: 'An isolated mini-site at /mix1. Home is Craft: two-line hero, carousel, process sheets, pixel fields. Work and about are Studio layouts with deck copy. /craft and /studio stay frozen. On the index it is room 07.',
  },
  spec: {
    kicker: '02 / Spec',
    title: 'Type, color, inset',
    body: 'src/studio/design.md is the source. Mix1 copies those tokens onto html[data-mix1] so home (no data-wkhs) matches work and about. Page title is heading--hg. Sections are xl. Cards and intros are md. Body is base. Kickers are xs. Paper is #f9f8f5. Ink is #090909. Inset is --safe-area.',
  },
  keep: {
    kicker: '03 / Exceptions',
    title: 'Keep these',
    items: [
      {
        name: 'Pixel game',
        note: '#hero-kv, #procflow, #footcity. Grayscale until Color On. Cell and brush stay Craft.',
      },
      {
        name: 'Pixel buttons',
        note: '.mix1-pxbtn, home CTAs, Image/Block chip, #pxctl squares. Clip path, fill primary, hover #3b5bd9.',
      },
      {
        name: 'Pixel tags',
        note: 'Carousel .tags, left aligned, --fs-xxs.',
      },
      {
        name: 'Color blocks',
        note: 'On by default for /mix1* only. Session key mix1-media-blocks — not the global media-blocks key.',
      },
      {
        name: 'Craft home skeleton',
        note: 'Two-line uppercase hero, carousel, process, --cell: 14px, --maxw: 1176px.',
      },
    ],
  },
  isolation: {
    kicker: '04 / Isolation',
    title: 'Do not leak',
    rows: [
      { k: 'html[data-mix1]', v: 'Every mix1 route.' },
      { k: 'data-craft', v: 'Home only, so Craft home.js and home.css run.' },
      { k: 'data-wkhs', v: 'Work, about, and this page — Studio layout CSS.' },
      { k: 'mix1-media-blocks', v: 'Blocks default on here; Poised/Craft/Studio stay on their own key.' },
    ],
  },
  sequence: {
    kicker: '05 / Sequence',
    title: 'How it was mashed',
    steps: [
      'Copy Craft home markup/runtime and Studio work/about into src/mix1. Do not edit the originals.',
      'One Osandi nav: Work / About. Wordmark home.',
      'Retarget type, color, and --safe-area from design.md onto html[data-mix1].',
      'Keep pixel game, pixel buttons, tags, and default-on color blocks as named exceptions.',
      'Fix inner pages in mix1.css only: nav size, reel block, intro wrap, one footer.',
    ],
  },
  broke: {
    kicker: '06 / What broke',
    title: 'Mix1-real, not Lenis.',
    items: [
      {
        challenge: 'Studio html[data-wkhs] a { font-size: inherit } shrank the mix1 nav on work/about.',
        solution: 'Prefix mix1-nav and .mix1-pxbtn with html[data-mix1] so they keep --fs-navigation.',
      },
      {
        challenge: 'Site .btn pill and uppercase leaked onto Get in touch and home CTAs.',
        solution: 'Reset border-radius and text-transform; clip-path is the chrome.',
      },
      {
        challenge: 'Work reel kept playing under Blocks — video background: transparent beat the paint.',
        solution: 'Set --media-block on .video-player__video and opacity: 0 on the video when blocks are on.',
      },
      {
        challenge: 'Wrapping intro scramble changed line count and shoved Team; then spaces vanished in inline-block slots.',
        solution: 'Lock each glyph to its final width; render word spaces as real spaces.',
      },
      {
        challenge: 'Work/about footers used Craft’s 1176 cap while the rest of the page was Studio full-bleed.',
        solution: 'One Mix1Contact: --safe-area / --block-vpadding, same seeking copy on both pages.',
      },
    ],
  },
  tradeoffs: {
    kicker: '07 / Tradeoffs',
    title: 'Choices we kept',
    rows: [
      { k: 'Home hero', v: 'Craft two-line uppercase. Fractured titles stay on work, about, build.' },
      { k: 'Nav', v: 'Work / About only. This page lives next to Deck in the footer.' },
      { k: 'Color', v: 'Color Off/On is the pixel game. Block/Image is media. They do not share a switch.' },
      { k: 'CSS', v: 'Override with html[data-mix1] specificity. Do not fork Craft or Studio stylesheets.' },
      { k: 'CMS', v: 'src/mix1/content.ts — thin pages, typed copy, no backend.' },
    ],
  },
  steal: {
    kicker: '08 / Steal this',
    title: 'If you mash two sites',
    items: [
      'Isolate with data-* on html and one wrapper CSS file.',
      'Write the spec once. Copy tokens onto the mashup root.',
      'Mash layouts. Do not duplicate vendor.css or home.css.',
      'Name the exceptions. Everything else follows the spec.',
      'Keep copy and image paths in a content module.',
    ],
    cta: 'See the work',
    href: '/mix1/work',
  },
} as const;

export const mix1Projects = [
  {
    slug: 'mezo-clay',
    name: 'Mezo Clay Design System',
    client: 'Mezo / Thesis',
    sector: 'Crypto',
    year: '2023',
    service: 'Systems',
    readTime: 4,
    image: '/images/portfolio/mock-thesis-systems.png',
    headline: 'Converting design debt into product infrastructure',
    intro:
      'What starts as a styling override always becomes a system problem. At Mezo, three product phases — legacy, testnet, mainnet — had accumulated enough inconsistency to slow every team touching the product. The work was infrastructure first, interface second.',
    featuredSections: [
      {
        lead: 'A design system is only as good as the governance behind it.',
        richTitle: 'Building the single source of truth',
        body: [
          "Led the full migration to Mezo Clay — partnering with Uber Base as the foundation and building a WCAG 2.2-compliant React library purpose-built for the Thesis BitcoinFi suite. Managed a direct report and an engineering contributor from execution through deployment.",
          "The post-launch audit identified premature styling as the primary implementation bottleneck — a pattern that shows up in every fast-moving crypto team. The fix wasn't more components; it was clearer rules about when to override them.",
        ],
        images: ['/images/portfolio/mock-thesis-systems.png', '/images/portfolio/mezo-hero.png'],
      },
      {
        lead: '2,000+ variants. 50+ base components. One source of truth.',
        richTitle: 'Scale, compliance, and delivery',
        body: [
          "Partnered with the contributing designer to set quality standards and pattern library conventions. Built and tested every variant against the Mezo product surfaces — deposit, borrow, wallet, explore — so each could ship without a separate design review cycle.",
          "The system became the infrastructure behind $322M in testnet deposits, 154K transactions, and $151M TVL at mainnet, peaking at $200M+.",
        ],
        images: ['/images/portfolio/mezo-wallet.png', '/images/portfolio/mezo-explore.png', '/images/portfolio/mezo-borrow.png'],
      },
      {
        lead: 'Design debt compounds silently until it stops shipping features.',
        richTitle: 'What the audit revealed',
        body: [
          "A 70% component integration rate at post-launch audit sounds like success. It is — but the 30% that wasn't integrated told the real story: premature styling decisions made during testnet were being maintained as one-off overrides instead of being resolved back into the system.",
          "The governance decisions informed by that audit — when to override, when to extend, when to propose a new component — were as important as the components themselves.",
        ],
        images: ['/images/portfolio/mock-thesis-systems.png', '/images/portfolio/mezo-borrow.png'],
      },
    ],
    mockups: [
      '/images/portfolio/mock-thesis-systems.png',
      '/images/portfolio/mezo-hero.png',
      '/images/portfolio/mezo-wallet.png',
    ],
    closingLead: 'Infrastructure that outlasts the sprint cycle is the difference between a design system and a component dump.',
    stats: [
      { name: 'Component integration', description: 'Post-launch audit established the baseline for system governance decisions.', value: '70%' },
      { name: 'TVL at mainnet peak', description: 'The system shipped with every product surface that contributed to Mezo growth.', value: '$200M+' },
      { name: 'Testnet deposits', description: 'Built on the infrastructure shipped during this engagement.', value: '$322M' },
      { name: 'Sprint completion', description: 'Maintained across the engagement from system build through deployment.', value: '98%' },
    ],
    tech: [
      { k: 'Foundation', v: 'Uber Base → Mezo Clay' },
      { k: 'Implementation', v: 'React + WCAG 2.2' },
      { k: 'Scale', v: '2,000+ variants · 50+ components' },
    ],
    tags: ['Design systems', 'Lead', 'Crypto', 'WCAG 2.2', 'React', 'Component library'],
    credits: [
      { role: 'Design lead', name: 'Osandi Robinson' },
      { role: 'Contributing designer', name: 'Poised LLC' },
      { role: 'Engineering', name: 'Thesis engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'Mezo / Thesis' },
      { role: 'PM', name: 'Thesis product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'deposit-on-mezo',
    name: 'Deposit on Mezo',
    client: 'Mezo / Thesis',
    sector: 'Crypto',
    year: '2023',
    service: 'Product',
    readTime: 3,
    image: '/images/portfolio/project-hero-coinbase.png',
    headline: "Improving the deposit flow that unlocked Mezo's liquidity",
    intro:
      "Depositing Bitcoin to Mezo wasn't a standard transfer. Users were bridging assets across chains into a protocol where a wrong address meant permanent loss of funds. The bar for clarity wasn't high — it was non-negotiable.",
    featuredSections: [
      {
        lead: 'Research confirmed the flow was broken before we touched a pixel.',
        richTitle: 'Diagnosing the problem',
        body: [
          "The existing deposit flow was perceived as risky and confusing — no upfront context, no network guidance, no unambiguous success state. Users had to infer what was happening at every step.",
          "The redesign introduced upfront deposit instructions before any commitment, surfaced network context and minimum thresholds early, and delivered success states specific enough that users knew their funds had arrived safely — not just that a transaction had fired.",
        ],
        images: ['/images/portfolio/project-hero-coinbase.png', '/images/portfolio/project-after-coinbase.png'],
      },
      {
        lead: 'The deposit flow became the primary on-ramp for all of Mezo\'s liquidity.',
        richTitle: 'Outcome and downstream impact',
        body: [
          "Vaults, pools, and rewards all depended on a working deposit experience. The redesign unblocked each of them — contributing directly to Mezo's growth to $200M+ TVL.",
          "Sprint completion held at 98% across the engagement, which meant the research and design process ran fast enough to stay ahead of engineering.",
        ],
        images: ['/images/portfolio/mezo-hero.png', '/images/portfolio/mezo-explore.png'],
      },
    ],
    mockups: ['/images/portfolio/project-hero-coinbase.png', '/images/portfolio/project-after-coinbase.png', '/images/portfolio/mezo-hero.png'],
    closingLead: 'Clarity at the point of commitment is not a UX nicety in a protocol where a wrong address means permanent loss.',
    stats: [
      { name: 'TVL at mainnet', description: 'Deposit flow was the primary on-ramp for all Mezo liquidity growth.', value: '$200M+' },
      { name: 'Active users', description: 'Reached at mainnet launch, enabled by a deposit experience that worked.', value: '25K+' },
      { name: 'Sprint completion', description: 'Maintained across the engagement from research through handoff.', value: '98%' },
    ],
    tech: [
      { k: 'Platform', v: 'Mobile + Web' },
      { k: 'Method', v: 'Research-led redesign' },
      { k: 'Protocol', v: 'Bitcoin bridge · cross-chain' },
    ],
    tags: ['Product design', 'Crypto', 'Fintech', 'Research', 'Mobile', 'Web'],
    credits: [
      { role: 'Product design', name: 'Osandi Robinson' },
      { role: 'Engineering', name: 'Thesis engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'Mezo / Thesis' },
      { role: 'PM', name: 'Thesis product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'borrow-musd',
    name: 'Borrow MUSD on Mezo',
    client: 'Mezo / Thesis',
    sector: 'Crypto',
    year: '2023',
    service: 'Product',
    readTime: 3,
    image: '/images/portfolio/project-01-borrow.png',
    headline: 'Making high-stakes borrowing feel safe, not complex',
    intro:
      'MUSD borrowing required users to hold collateralization ratio, liquidation threshold, and variable APR in their heads simultaneously. None of those concepts have mainstream equivalents. The design problem was weight, not simplification.',
    featuredSections: [
      {
        lead: 'Consequential decisions need to feel consequential — not overwhelming.',
        richTitle: 'Progressive disclosure as the primary tool',
        body: [
          "Progressive disclosure let us surface complexity only when it was relevant to the decision at hand. A user setting their collateral ratio doesn't need to see APR mechanics at the same moment.",
          "Error handling was consolidated to a single inline signal. Before the redesign, errors appeared in multiple places with inconsistent framing — adding cognitive load at the worst possible moment.",
        ],
        images: ['/images/portfolio/project-01-borrow.png', '/images/portfolio/project-02-loan.png'],
      },
      {
        lead: 'Benchmarking against established DeFi patterns reduced the learning curve.',
        richTitle: 'Expanding the addressable market',
        body: [
          "The redesign borrowed interaction models from familiar financial interfaces — not to hide the complexity of DeFi, but to lower the entry cost for users coming from traditional finance.",
          "The borrow flow shipped as part of the mainnet launch suite, contributing to Mezo's $200M+ TVL and supporting expansion into a broader addressable market beyond early adopters.",
        ],
        images: ['/images/portfolio/project-03-wallet.png', '/images/portfolio/project-04-marketplace.png'],
      },
    ],
    mockups: ['/images/portfolio/project-01-borrow.png', '/images/portfolio/project-02-loan.png', '/images/portfolio/project-03-wallet.png'],
    closingLead: 'The job isn\'t to make DeFi simple. It\'s to make consequential decisions feel proportionally weighted.',
    stats: [
      { name: 'TVL at mainnet', description: 'Borrow flow contributed to Mezo\'s liquidity growth alongside deposit and wallet.', value: '$200M+' },
      { name: 'Active users', description: 'Reached at mainnet launch across all Mezo product surfaces.', value: '25K+' },
    ],
    tech: [
      { k: 'Platform', v: 'Mobile + Web' },
      { k: 'Method', v: 'Progressive disclosure · benchmarking' },
      { k: 'Protocol', v: 'MUSD collateralized borrowing' },
    ],
    tags: ['Product design', 'Crypto', 'DeFi', 'Research', 'Progressive disclosure'],
    credits: [
      { role: 'Product design', name: 'Osandi Robinson' },
      { role: 'Engineering', name: 'Thesis engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'Mezo / Thesis' },
      { role: 'PM', name: 'Thesis product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'blockfi-mobile',
    name: 'BlockFi Mobile',
    client: 'BlockFi',
    sector: 'Fintech',
    year: '2021',
    service: 'Leadership',
    readTime: 4,
    image: '/images/portfolio/gf-blockfi.jpg',
    headline: 'Redefining mobile trading to drive 200%+ transaction volume in 90 days',
    intro:
      "BlockFi's mobile trading had a surface problem and a structural one. USD denomination was the thing people complained about. The real issue was a flow built around what engineering found easiest to implement, not how traders actually think.",
    featuredSections: [
      {
        lead: 'Pushing back on the brief was the first design decision.',
        richTitle: 'Reframing the problem',
        body: [
          "Product benchmarking and heuristic evaluation surfaced a pattern no one had named yet: the segmented control forcing users to choose denomination before intent was the single biggest source of drop-off. Moving buy/sell intent before the amount screen eliminated it.",
          "Recurring trades had been buried at the summary screen — three steps too late. Surfacing them earlier required a structural change to the flow that the original brief hadn't scoped. Both decisions were validated through user testing before implementation.",
        ],
        images: ['/images/portfolio/gf-blockfi.jpg', '/images/portfolio/mock-bbu.png'],
      },
      {
        lead: 'Trades grew 200%+ in 90 days. Mobile outpaced web for the first time.',
        richTitle: 'Measuring the impact',
        body: [
          "The same changes were applied consistently across web and mobile — not as a one-off mobile fix but as a rethought trading interaction model. The consistency mattered as much as the individual improvements.",
          "The result contributed directly to BlockFi's growth in service of 225K+ clients and $50M monthly revenue — and validated the case for design having a seat at product strategy decisions, not just execution.",
        ],
        images: ['/images/portfolio/gf-blockfi.jpg', '/images/portfolio/gf-fennel.png'],
      },
    ],
    mockups: ['/images/portfolio/gf-blockfi.jpg', '/images/portfolio/mock-bbu.png', '/images/portfolio/gf-fennel.png'],
    closingLead: 'The brief was too small. Pushing back on it was the design work.',
    stats: [
      { name: 'Trades in 90 days', description: 'Mobile outpaced web-based trades for the first time following launch.', value: '+200%' },
      { name: 'Monthly revenue', description: 'BlockFi revenue at time of engagement, grown in part through trading volume.', value: '$50M' },
      { name: 'Clients served', description: 'Active BlockFi users at time of mobile trading redesign launch.', value: '225K+' },
    ],
    tech: [
      { k: 'Platform', v: 'iOS + Android + Web' },
      { k: 'Method', v: 'Benchmarking · user testing' },
      { k: 'Role', v: 'Director of Product Design' },
    ],
    tags: ['Lead', 'Fintech', 'Mobile', 'iOS', 'Android', 'Director'],
    credits: [
      { role: 'Design director', name: 'Osandi Robinson' },
      { role: 'Product designers', name: 'BlockFi design team' },
      { role: 'Engineering', name: 'BlockFi engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'BlockFi' },
      { role: 'PM', name: 'BlockFi product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'cash-native-app',
    name: 'C@SH Native App',
    client: 'a16z Crypto portfolio',
    sector: 'Crypto',
    year: '2022',
    service: 'Leadership',
    readTime: 3,
    image: '/images/portfolio/gf-cash.png',
    headline: 'Zero-to-one product design that informed a strategic pivot',
    intro:
      "Building a design function before the first hire means every decision compounds. The component library you build becomes the product. The research you run becomes the strategy.",
    featuredSections: [
      {
        lead: 'A branded component library before a single internal designer was hired.',
        richTitle: 'Building the function from zero',
        body: [
          "Customized Uber Base into a branded library that doubled engineering speed and gave the team a shared vocabulary to build with from day one. The VC principal set a high bar — a premium product resonating with an urban audience — and we met it, validated through affinity testing.",
          "Full light and dark mode shipped. The same research surfaced a harder finding: the market hadn't matured enough for a social wallet.",
        ],
        images: ['/images/portfolio/gf-cash.png', '/images/portfolio/mock-vinyl-crate.png'],
      },
      {
        lead: "The research that shaped the pivot preserved capital that would otherwise have been spent.",
        richTitle: 'When research becomes strategy',
        body: [
          "Identifying insufficient market traction before over-investing in the product direction was the most valuable output of the engagement. The design foundation remained intact for the company's next direction.",
          "Building 0→1 means the research has to do double duty — validating the product and validating the strategy. Here, it did both.",
        ],
        images: ['/images/portfolio/mock-a16z.png', '/images/portfolio/gf-cash.png'],
      },
    ],
    mockups: ['/images/portfolio/gf-cash.png', '/images/portfolio/mock-a16z.png', '/images/portfolio/mock-vinyl-crate.png'],
    closingLead: 'The most valuable deliverable was the research that stopped us from building the wrong thing.',
    stats: [
      { name: 'Design function', description: 'Built from zero before the first internal design hire.', value: '0 → 1' },
      { name: 'Engineering speed', description: 'Doubled by shipping a branded component library on day one.', value: '2×' },
    ],
    tech: [
      { k: 'Foundation', v: 'Uber Base → custom library' },
      { k: 'Platform', v: 'iOS + Android' },
      { k: 'Method', v: 'Affinity testing · 0→1 build' },
    ],
    tags: ['0→1', 'Lead', 'Crypto', 'Mobile', 'iOS', 'Android', 'Design systems'],
    credits: [
      { role: 'Design lead', name: 'Osandi Robinson' },
      { role: 'Engineering', name: 'C@SH engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'a16z Crypto portfolio' },
      { role: 'PM', name: 'C@SH product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'easi-food-delivery',
    name: 'EASI Food Delivery',
    client: 'EASI',
    sector: 'Consumer',
    year: '2020',
    service: 'Consultant',
    readTime: 4,
    image: '/images/portfolio/gf-easi.jpg',
    headline: 'Rearchitecting EASI to win a second audience — and a $500M valuation',
    intro:
      "EASI had a real market and a broken product. A sub-3.0 App Store rating and frequent crashes weren't edge cases — they were capping the total addressable market. The problem wasn't the audience; it was the experience they were being asked to tolerate.",
    featuredSections: [
      {
        lead: 'Benchmarking built the stakeholder confidence that unlocked the redesign.',
        richTitle: 'Building the case for change',
        body: [
          "Six weeks. Skeptical stakeholders. A team that had shipped the original product and wasn't sure anything needed to change. Benchmarking gave us a shared language for what 'good' looked like — not opinions, but patterns from products the team already respected.",
          "Once the case was made, the redesign ran in parallel with engineering's re-architecture — prototyping and testing each decision before handoff, so no one was waiting on anyone.",
        ],
        images: ['/images/portfolio/gf-easi.jpg', '/images/portfolio/mock-ubiquiti.png'],
      },
      {
        lead: 'App Store rating: below 3.0 to 4.5. Acquired for $500M+.',
        richTitle: 'The numbers that followed',
        body: [
          "EASI surpassed 1M+ users and reached a $500M+ valuation. HungryPanda's acquisition rationale in 2022 mirrored the market strategy the redesign was built around — expanding from diaspora communities into a broader urban audience.",
          "The six-week timeline wasn't a constraint. It was the discipline that kept the scope focused on what would move the numbers.",
        ],
        images: ['/images/portfolio/gf-easi.jpg', '/images/portfolio/gf-blinkist.jpg'],
      },
    ],
    mockups: ['/images/portfolio/gf-easi.jpg', '/images/portfolio/gf-blinkist.jpg', '/images/portfolio/mock-ubiquiti.png'],
    closingLead: 'A 4.5-star rating is a market signal. The $500M acquisition validated the strategy the redesign was built around.',
    stats: [
      { name: 'App Store rating', description: 'Climbed from below 3.0 to 4.5 stars following the redesign launch.', value: '3.0→4.5' },
      { name: 'Users', description: 'EASI passed 1M+ users after the redesign expanded its addressable market.', value: '1M+' },
      { name: 'Valuation at acquisition', description: 'HungryPanda acquired EASI in 2022 for a reported $500M+.', value: '$500M+' },
    ],
    tech: [
      { k: 'Platform', v: 'iOS + Android' },
      { k: 'Method', v: 'Benchmarking · prototype testing' },
      { k: 'Timeline', v: '6 weeks' },
    ],
    tags: ['Consultant', 'Consumer', 'Mobile', 'iOS', 'Android', 'Benchmarking'],
    credits: [
      { role: 'Design consultant', name: 'Osandi Robinson' },
      { role: 'Engineering', name: 'EASI engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'EASI' },
      { role: 'PM', name: 'EASI product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'krisp-ai',
    name: 'Krisp AI',
    client: 'Krisp',
    sector: 'AI',
    year: '2020',
    service: 'Consultant',
    readTime: 3,
    image: '/images/portfolio/gf-krisp.jpg',
    headline: "Product innovation for Krisp.ai's noise cancelling desktop application",
    intro:
      "Krisp had strong utility and a dated interface. The noise cancellation worked. The desktop experience hadn't kept pace with what AI-native software was starting to look like — and that gap was starting to matter.",
    featuredSections: [
      {
        lead: 'A modern UI system, not a reskin.',
        richTitle: 'Redesigning for scale',
        body: [
          "Engaged as principal design consultant, I redesigned the application around a cohesive UI system — introducing branded components to accelerate implementation, reduce design debt, and establish a visual foundation capable of scaling with the product.",
          "The work ran until COVID-19 created market uncertainty across the consumer audio space. What was scoped as a foundation for growth became a foundation for a pivot.",
        ],
        images: ['/images/portfolio/gf-krisp.jpg', '/images/portfolio/mock-early-flow.png'],
      },
      {
        lead: 'Krisp pivoted into meeting intelligence. The structural work held.',
        richTitle: 'When the brief changes',
        body: [
          "The shift toward enterprise aesthetics and recording features was a different design brief than the original work was built to serve. But the component layer and the system thinking behind it gave the team a structured starting point for that evolution.",
          "That's the value of system work over surface work — it outlives the original brief.",
        ],
        images: ['/images/portfolio/gf-krisp.jpg', '/images/portfolio/mock-apple-genius.png'],
      },
    ],
    mockups: ['/images/portfolio/gf-krisp.jpg', '/images/portfolio/mock-early-flow.png', '/images/portfolio/mock-apple-genius.png'],
    closingLead: 'System work outlives the brief it was built for. That\'s the difference between components and infrastructure.',
    stats: [
      { name: 'Engagement type', description: 'Engaged as principal design consultant for the desktop UI system redesign.', value: 'Principal' },
    ],
    tech: [
      { k: 'Platform', v: 'Desktop (macOS + Windows)' },
      { k: 'Method', v: 'UI system · component library' },
    ],
    tags: ['Consultant', 'AI', 'Desktop', 'Design systems', 'macOS', 'Windows'],
    credits: [
      { role: 'Design consultant', name: 'Osandi Robinson' },
      { role: 'Engineering', name: 'Krisp engineering' },
    ],
    clientCredits: [
      { role: 'Client', name: 'Krisp' },
      { role: 'PM', name: 'Krisp product team' },
    ],
    motionDemos: [],
  },
  {
    slug: 'zalando-stories',
    name: 'Zalando Stories',
    client: 'Zalando',
    sector: 'Consumer',
    year: '2023',
    service: 'Systems',
    readTime: 4,
    image: '/images/portfolio/gf-fennel.png',
    headline: 'One motion language for a platform built on a proven bet',
    intro:
      "In 2022, Zalando took a majority stake in Highsnobiety, betting that editorial content — not just catalog browsing — could drive commerce at scale. The bet was already working: over 80 curated product drops run together had reached 7 million+ unique users before the platform even had a name. Stories was the next step — turning that into a permanent feature, not a one-off collaboration.",
    featuredSections: [
      {
        lead: 'The same gesture felt different depending on where you saw it.',
        richTitle: 'Naming the fragmentation',
        body: [
          'Getting there meant solving a less glamorous problem first. Every editorial format — a cover story, a style guide, a guest edit — needed transitions that felt consistent whether someone hit them on the app or the web. Motion was still a pile of individual files; the same gesture read differently depending on where you encountered it.',
          'An eight-step sprint opened by naming that fragmentation, then mapped every existing motion instance across the product before setting a bar for what a shared system would need to cover.',
        ],
        images: ['/images/portfolio/project-02-loan.png', '/images/portfolio/project-03-wallet.png'],
      },
      {
        lead: 'Timing tokens, then a short list of primitives that compose into any format.',
        richTitle: 'Tokens, primitives, patterns',
        body: [
          'What shipped: tokens defining raw timing and easing, primitives — sheet, enter/exit, press, swipe-up — defining reusable interaction patterns built from those tokens, and patterns combining primitives into on-screen behaviors editors and engineers could reach for without re-deriving anything. Swipe-up, the gesture that opens a Story full-screen, became the reference example: specified once, used everywhere a story needed to expand.',
          'Design and engineering stopped trading animation files. A new format now borrows motion from the token layer instead of inventing its own.',
        ],
        images: ['/images/portfolio/project-04-marketplace.png', '/images/portfolio/project-after-coinbase.png'],
      },
    ],
    mockups: ['/images/portfolio/gf-fennel.png', '/images/portfolio/project-02-loan.png', '/images/portfolio/project-04-marketplace.png'],
    closingLead: 'Stories launched September 14, 2023, across 11 European markets with five recurring formats. The motion system is what let that scale to 500+ stories and 700+ brands without the consistency breaking — the difference between a one-off content experiment and a durable platform.',
    stats: [
      { name: 'Pre-launch reach', description: '80+ curated product drops with Highsnobiety, before Stories had a name.', value: '7M+ users' },
      { name: 'Launch markets', description: 'Austria, Belgium, Denmark, France, Germany, Italy, Netherlands, Spain, Sweden, Switzerland, UK — Sept 14, 2023.', value: '11' },
      { name: 'Formats at launch', description: 'Cover Story, Style Bible, Guest Edit, The Perfect X, Unpacked.', value: '5' },
      { name: 'Scaled to', description: 'Stories published since launch, per Zalando.', value: '500+' },
    ],
    tech: [
      { k: 'Method', v: 'Design Sprint · token-first system design' },
      { k: 'Deliverable', v: 'Timing tokens, motion primitives, DS contribution' },
      { k: 'Source', v: 'corporate.zalando.com, Sept 14 2023' },
    ],
    tags: ['Systems', 'Consumer', 'Motion', 'Design Sprint'],
    credits: [
      { role: 'Design lead', name: 'Osandi Robinson' },
      { role: 'Content', name: 'Mal Som' },
    ],
    clientCredits: [
      { role: 'Client', name: 'Zalando' },
    ],
    motionDemos: [
      { label: 'Default ease', src: '/videos/motion/easing-default.mp4' },
      { label: 'Ease-out cubic', src: '/videos/motion/easing-out-cubic.mp4' },
      { label: 'Linear', src: '/videos/motion/easing-linear.mp4' },
    ],
  },
] as const;