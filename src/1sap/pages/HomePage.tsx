import { useSapRuntime } from '../useSapRuntime';
import markup from '../markup/home.html?raw';
import homeRuntime from '../scripts/home.js?raw';
import '../styles/home.css';

export function HomePage() {
  useSapRuntime(homeRuntime);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
