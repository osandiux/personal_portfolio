export type AppId =
  | 'finder'
  | 'mail'
  | 'notes'
  | 'photos'
  | 'music'
  | 'terminal'
  | 'civie'
  | 'apps'
  | 'trash'
  | 'about'
  | 'preview'
  | 'readme';

export const DOCK: { id: AppId | 'link'; label: string; icon: string; href?: string; splitAfter?: boolean }[] = [
  { id: 'finder', label: 'Finder', icon: '/os1/menu/app_finder.png' },
  { id: 'mail', label: 'Mail', icon: '/os1/menu/app_mail.png' },
  { id: 'notes', label: 'Notes', icon: '/os1/menu/app_notes.png' },
  { id: 'photos', label: 'Photos', icon: '/os1/menu/app_photos.png' },
  { id: 'music', label: 'Music', icon: '/os1/menu/app_music.png' },
  { id: 'terminal', label: 'Terminal', icon: '/os1/menu/app_terminal.png' },
  { id: 'civie', label: 'Civie', icon: '/os1/menu/app_civie.png' },
  { id: 'apps', label: 'Apps', icon: '/os1/menu/app_apps.png', splitAfter: true },
  { id: 'trash', label: 'Trash', icon: '/os1/menu/app_trash.png' },
];

export const LAUNCHER = [
  { label: 'GitHub', icon: '/os1/menu/app_github.png', href: 'https://github.com/guchris' },
  { label: 'Instagram', icon: '/os1/menu/app_insta.png', href: 'https://www.instagram.com/gu_christopher/' },
  { label: 'TikTok', icon: '/os1/menu/app_tiktok.png', href: 'https://www.tiktok.com/@gucduck' },
  { label: 'LinkedIn', icon: '/os1/menu/app_linkedin.png', href: 'https://www.linkedin.com/in/gu-christopher' },
  { label: 'Google Photos', icon: '/os1/menu/app_googlephotos.png', href: 'https://photos.app.goo.gl/Yg7kXRZKbnVCtZtH8' },
  { label: 'Civie', icon: '/os1/menu/app_civie.png', href: 'https://civie.org' },
  { label: 'TTF', icon: '/os1/menu/app_ttf.png', href: 'https://ttf.gucduck.com' },
  { label: 'Stellar Effects', icon: '/os1/menu/app_stellar.png', href: 'https://stellar-effects.webflow.io/' },
  { label: 'Photo Booth', icon: '/os1/menu/app_photobooth.png', id: 'photos' as const },
  { label: 'Spotify', icon: '/os1/menu/app_spotify.png', id: 'music' as const },
];

export const NOTIFICATIONS = [
  {
    id: 'gucduck',
    app: 'gucduck',
    title: 'Welcome to my pond',
    body: 'QUACK! Waddle around, open some apps, and make yourself at home.',
    time: 'now',
  },
  {
    id: 'messages-will',
    app: 'Messages',
    image: '/os1/menu/app_messages.png',
    title: 'Will',
    body: "i'm tinkering on a little project tonight, come build next to me? ilysm 🥹❤️",
    time: '2m ago',
  },
  {
    id: 'music-pressgo',
    app: 'Music',
    image: '/os1/menu/app_music.png',
    title: 'duckwave: Press Go',
    body: 'Now playing from your library. "Push off with your feet, and then press go."',
    time: '12m ago',
  },
  {
    id: 'instagram',
    app: 'Instagram',
    image: '/os1/menu/app_insta.png',
    title: 'Guess the Gibberish',
    body: 'Your AR filter crossed another billion impressions this month.',
    time: '25m ago',
  },
  {
    id: 'messages-jeremy',
    app: 'Messages',
    image: '/os1/menu/app_messages.png',
    title: 'Jeremy',
    body: 'coffee + laptops at Yoka today? i cannot work from home another minute lol',
    time: '38m ago',
  },
  {
    id: 'calendar-grounded',
    app: 'Calendar',
    image: '/os1/menu/app_calendar.png',
    title: 'Grounded: New Orleans Edition',
    body: 'Pop-up café opens in 1 hour. Chicory coffee, beignets, and jazz.',
    time: 'Today, 4:00 PM',
  },
  {
    id: 'strava',
    app: 'Strava',
    image: '/os1/menu/app_strava.png',
    title: 'Tour du Mont Blanc',
    body: '5 days, 3 countries, 1 Coke Zero per climb. Kudos still rolling in.',
    time: 'Yesterday',
  },
  {
    id: 'etsy',
    app: 'Highs Lows & Rainbows',
    image: '/os1/menu/app_etsy.png',
    title: 'New 5-star review',
    body: '"Cutest cards ever, featured in Etsy\'s New Finds for a reason!"',
    time: 'Yesterday',
  },
  {
    id: 'civie',
    app: 'Civie',
    image: '/os1/menu/app_civie.png',
    title: "Today's question is live",
    body: "Your say, every day. Cast your vote and see how the country's leaning.",
    time: 'Yesterday',
  },
];

export const TRACKS = [
  { title: 'Rhythm Inside x Mud Blood', artist: 'Miner Key', album: 'ICCA 2020' },
  { title: 'Quiet', artist: 'Miner Key', album: 'ICCA 2020' },
  { title: 'Juice', artist: 'Miner Key', album: 'ICCA 2020' },
  { title: 'Press Go', artist: 'duckwave', album: 'Singles' },
  { title: 'First Yes', artist: 'duckwave', album: 'Singles' },
];
