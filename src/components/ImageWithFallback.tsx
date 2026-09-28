import { useState, type CSSProperties } from 'react';

const FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600">' +
  '<rect width="100%" height="100%" fill="%23d9dce3"/></svg>';

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  style?: CSSProperties;
}

export default function ImageWithFallback({ src, alt, style }: ImageWithFallbackProps) {
  const [current, setCurrent] = useState(src || FALLBACK);

  return (
    <img
      src={current}
      alt={alt}
      onError={() => setCurrent(FALLBACK)}
      style={{ display: 'block', width: '100%', objectFit: 'cover', ...style }}
    />
  );
}