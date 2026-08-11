import { useEffect, useState } from 'react';

function now(): string {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function useLocalClock(): string {
  const [time, setTime] = useState(now);
  useEffect(() => {
    const id = setInterval(() => setTime(now()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}
