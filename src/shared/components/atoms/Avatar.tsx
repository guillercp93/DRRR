import type { CSSProperties } from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = '', width, height, color, onClick }) => {
  const style: CSSProperties = {};
  if (onClick) style.cursor = 'pointer';
  if (color) style.backgroundColor = color;

  return (
    <figure className="Avatar" onClick={onClick}>
      <img src={src} alt={alt} width={width} height={height} style={style} />
    </figure>
  );
};

export default Avatar;
