export type WorkItem = {
  slug: string;
  title: string;
  industry: string;
  services: string;
  ratio: number;
  width: number;
  image: string;
  grid: { r: number; c: number };
  href?: string;
};

export const WORK: WorkItem[] = [
  { slug: 'makhno', title: 'Makhno', industry: 'Architecture, Furniture', services: 'Creative Direction, Web Design/Dev', ratio: 1, width: 13.2, image: 'https://cms.obys.agency/uploads/small_Makhno_Thumbnail_e6008952f7.webp', grid: { r: 1, c: 2 }, href: 'https://makhno.com' },
  { slug: 'source-unknown', title: 'Source Unknown', industry: 'Fashion', services: 'Web Design/Dev', ratio: 0.8, width: 17.5, image: 'https://cms.obys.agency/uploads/small_Source_Unknown_Thumbnail_7e7a08561b.webp', grid: { r: 1, c: 4 } },
  { slug: 'autex', title: 'Autex', industry: 'Architecture', services: 'Web Design', ratio: 1, width: 18.4, image: 'https://cms.obys.agency/uploads/small_1_fae12fb704.webp', grid: { r: 1, c: 7 } },
  { slug: 'odins-crow', title: 'Odin’s Crow', industry: 'Fashion, Photography', services: 'Creative Direction, Web Design/Dev', ratio: 0.67, width: 13.2, image: 'https://cms.obys.agency/uploads/small_Odin_s_Crow_Thumbnail_4dc8764e8a.webp', grid: { r: 1, c: 8 } },
  { slug: 'olga-prudka', title: 'Olga Prudka', industry: 'Photography, Fashion', services: 'Web Design/Dev, Identity', ratio: 1.5, width: 19.6, image: 'https://cms.obys.agency/uploads/small_Olga_Prudka_Thumbnail_73c88a2131.webp', grid: { r: 1, c: 11 } },
  { slug: 'yulia', title: 'Yulia', industry: 'Fashion', services: 'Web Design/Dev, Identity', ratio: 1, width: 13.2, image: 'https://cms.obys.agency/uploads/small_Yulia_Thumbnail_3226edc489.webp', grid: { r: 1, c: 12 } },
  { slug: 'the-ways-we-work-miro', title: 'The Ways We Work (Miro)', industry: 'Technology', services: 'Web Design/Dev', ratio: 0.8, width: 17.5, image: 'https://cms.obys.agency/uploads/small_Miro_Thumbnail_413fefb05d.webp', grid: { r: 2, c: 1 } },
  { slug: 'design-education-series', title: 'Design Education Series', industry: 'Education', services: 'Concept, Web Design/Dev, Identity', ratio: 1, width: 18.4, image: 'https://cms.obys.agency/uploads/small_DES_Thumbnail_41ecc849b9.webp', grid: { r: 2, c: 2 } },
  { slug: 'obys-design-books', title: 'Obys’ Design Books', industry: 'Education', services: 'Concept, Web Design/Dev, Identity', ratio: 0.67, width: 13.2, image: 'https://cms.obys.agency/uploads/small_ODB_Thumbnail_ed9b4aa0f3.webp', grid: { r: 2, c: 5 } },
  { slug: 'eminente', title: 'Eminente', industry: 'Fashion, Photography', services: 'Creative Direction, Web Design/Dev', ratio: 1.5, width: 19.6, image: 'https://cms.obys.agency/uploads/small_Eminente_Thumbnail_d7767e1666.webp', grid: { r: 2, c: 6 } },
  { slug: 'abetka', title: 'Abetka', industry: 'Culture', services: 'Concept, Web Design/Dev, Identity', ratio: 1, width: 13.2, image: 'https://cms.obys.agency/uploads/small_Abetka_Thumbnail_25b7c61177.webp', grid: { r: 2, c: 9 } },
  { slug: 'black-sheep', title: 'BlackSheep', industry: 'Architecture, Development', services: 'Creative Direction, Web Design/Dev', ratio: 0.8, width: 17.5, image: 'https://cms.obys.agency/uploads/small_Black_Sheep_Thumbnail_09c8874314.webp', grid: { r: 2, c: 10 } },
  { slug: 'salience-labs', title: 'Salience Labs', industry: 'Technology', services: 'Web Design/Dev, 3D', ratio: 1, width: 18.4, image: 'https://cms.obys.agency/uploads/small_1_176ec7aa0f.webp', grid: { r: 2, c: 11 } },
  { slug: 'ai-modernism-of-kharkiv', title: 'AI Modernism of Kharkiv', industry: 'Culture, Side Project', services: 'Concept, Web Design/Dev, Identity', ratio: 0.67, width: 13.2, image: 'https://cms.obys.agency/uploads/small_AIM_Thumbnail_de091a7b48.webp', grid: { r: 2, c: 12 } },
  { slug: 'glyphic-biotechnologies', title: 'Glyphic Biotechnologies', industry: 'Technology, Biotech', services: 'Creative Direction, Web Design/Dev, 3D', ratio: 1.5, width: 19.6, image: 'https://cms.obys.agency/uploads/small_Glyphic_Biotechnologies_Thumbnail_50ecd8bb9a.webp', grid: { r: 3, c: 1 } },
  { slug: 'porsche-taycan', title: 'Porsche Taycan', industry: 'Automotive', services: 'Web Design/Dev', ratio: 1, width: 13.2, image: 'https://cms.obys.agency/uploads/small_4_1eae03d525.webp', grid: { r: 3, c: 3 } },
  { slug: 'ayocin-atmos-lamp', title: 'Ayocin (Atmos Lamp)', industry: 'Technology, Furniture', services: 'Creative Direction, Web Design/Dev', ratio: 0.8, width: 17.5, image: 'https://cms.obys.agency/uploads/small_Ayocin_Thumbnail_0965a26e06.webp', grid: { r: 3, c: 4 } },
  { slug: 'grids', title: 'Grids', industry: 'Education, Side Project', services: 'Concept, Web Design/Dev, Identity', ratio: 1, width: 18.4, image: 'https://cms.obys.agency/uploads/small_Grids_Thumbnail_674aa5712c.webp', grid: { r: 3, c: 5 } },
  { slug: 'peter-lindbergh', title: 'Peter Lindbergh', industry: 'Fashion, Photography', services: 'Concept, Web Design/Dev', ratio: 0.67, width: 13.2, image: 'https://cms.obys.agency/uploads/small_Peter_Thumbnail_bee0ce3a78.webp', grid: { r: 3, c: 8 } },
];

export const AWARDS = [
  { label: 'Studio of the Year (Awwwards)', href: 'https://www.awwwards.com/obys/' },
  { label: '4x Studio of the Year (CSSDA)', href: 'https://www.cssdesignawards.com/search?search_term=obys' },
  { label: 'Best of the Best (Red Dot)', href: 'https://www.red-dot.org/obys-agency' },
  { label: 'Jury Prize (European Design Awards)', href: 'https://awards.europeandesign.org/winner/259537' },
  { label: '30+ Site of the Day (Awwwards)', href: 'https://www.awwwards.com/obys/' },
  { label: '35+ Website of the Day (CSSDA)', href: 'https://www.cssdesignawards.com/search?search_term=obys' },
  { label: '3x Award of Excellence (Communication Arts)', href: 'https://www.commarts.com/' },
  { label: 'Best of the Behance (Behance)', href: 'https://www.behance.net/' },
];

export const SPEECHES = [
  { label: 'The Geek Gathering. Osijek, Croatia (2025)', href: 'https://www.linkedin.com/' },
  { label: 'Awwwards. Valencia, Spain (2024)', href: 'https://www.youtube.com/watch?v=W-2UVeSqO70' },
  { label: 'Dysarium. Lviv, Ukraine (2024)', href: 'https://www.instagram.com/p/DBD5ZJcto_T/' },
  { label: 'Awwwards. Amsterdam, Netherlands (2022)', href: 'https://www.instagram.com/p/CikrzUrDXJ4/' },
];

export const PRESS = [
  { label: 'Codrops — Small Studio, Big Narratives', href: 'https://tympanus.net/codrops/2026/03/06/obys-the-small-studio-designing-big-digital-narratives/' },
  { label: 'Awwwards — The New Obys', href: 'https://www.awwwards.com/the-new-obys.html' },
  { label: 'Communication Arts', href: 'https://www.commarts.com/webpicks/obys-1' },
];

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/obys/' },
  { label: 'Awwwards', href: 'https://www.awwwards.com/obys/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/obys/' },
];

export const EMAIL = 'info@obys.agency';

export const GRID_EMPTY: { r: number; c: number; n: string }[] = [
  { r: 1, c: 1, n: '01' },
  { r: 1, c: 3, n: '03' },
  { r: 1, c: 5, n: '05' },
  { r: 1, c: 6, n: '06' },
  { r: 1, c: 9, n: '09' },
  { r: 1, c: 10, n: '10' },
  { r: 2, c: 3, n: '15' },
  { r: 2, c: 4, n: '16' },
  { r: 2, c: 7, n: '19' },
  { r: 2, c: 8, n: '20' },
  { r: 3, c: 2, n: '26' },
  { r: 3, c: 6, n: '30' },
  { r: 3, c: 7, n: '31' },
  { r: 3, c: 11, n: '35' },
  { r: 4, c: 4, n: '40' },
  { r: 4, c: 5, n: '41' },
  { r: 4, c: 7, n: '43' },
  { r: 4, c: 8, n: '44' },
  { r: 4, c: 10, n: '46' },
  { r: 5, c: 1, n: '49' },
  { r: 5, c: 3, n: '51' },
  { r: 5, c: 5, n: '53' },
  { r: 5, c: 6, n: '54' },
  { r: 5, c: 9, n: '57' },
  { r: 5, c: 10, n: '58' },
  { r: 6, c: 3, n: '63' },
  { r: 6, c: 4, n: '64' },
  { r: 6, c: 7, n: '67' },
  { r: 6, c: 8, n: '68' },
];
