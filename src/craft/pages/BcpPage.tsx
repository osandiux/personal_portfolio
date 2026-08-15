import { useCraftRuntime } from '../useCraftRuntime';
import markup from '../markup/bcp.html?raw';
import bcpRuntime from '../scripts/bcp.js?raw';
import '../styles/bcp.css';

export function BcpPage() {
  useCraftRuntime(bcpRuntime);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
