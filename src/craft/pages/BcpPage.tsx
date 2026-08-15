import { useLayoutEffect } from 'react';
import { runCraftRuntime } from '../runtime';
import markup from '../markup/bcp.html?raw';
import bcpRuntime from '../scripts/bcp.js?raw';
import '../styles/bcp.css';

export function BcpPage() {
  useLayoutEffect(() => runCraftRuntime(bcpRuntime), []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
