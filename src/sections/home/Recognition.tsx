import { recognition } from '../../content/home';
import { Eyebrow, Marquee, Quote } from '../../components/primitives';
import { useInView } from '../../hooks/useInView';

export function Recognition() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="recognition reveal" aria-label="Recognition and selected press">
      <Eyebrow>{recognition.label}</Eyebrow>
      <Quote lines={[recognition.quoteA, recognition.quoteB]} source={recognition.source} />
      <Marquee items={recognition.press} />
    </section>
  );
}
