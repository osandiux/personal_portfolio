export function Picture({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <picture className={`picture picture--rounded picture--loaded ${className}`.trim()}>
      <img className="picture__img" src={src} alt={alt} loading="lazy" />
    </picture>
  );
}
