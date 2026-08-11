import { Hero } from '../sections/home/Hero';
import { RollShowcase } from '../sections/home/RollShowcase';
import { FeaturedArchive } from '../sections/home/FeaturedArchive';
import { AboutTeaser } from '../sections/home/AboutTeaser';
import { Recognition } from '../sections/home/Recognition';
import { JournalTeaser } from '../sections/home/JournalTeaser';
import '../sections/home/home.css';

export function HomePage() {
  return (
    <>
      <Hero />
      <RollShowcase />
      <FeaturedArchive />
      <AboutTeaser />
      <Recognition />
      <JournalTeaser />
    </>
  );
}
