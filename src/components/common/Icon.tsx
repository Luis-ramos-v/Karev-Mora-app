import { memo } from 'react';
import styled from 'styled-components';
import type { IconName } from '../../generated/asset-manifest';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const getIconClass = (name: IconName): string => {
  switch (name) {
    case 'onlyfans':
      return 'fa-brands fa-onlyfans';
    case 'paypal':
      return 'fa-brands fa-paypal';
    case 'twitter':
      return 'fa-brands fa-x-twitter';
    case 'instagram':
      return 'fa-brands fa-instagram';
    case 'github':
      return 'fa-brands fa-github';
    case 'linkedin':
      return 'fa-brands fa-linkedin';
    case 'youtube':
      return 'fa-brands fa-youtube';
    case 'discord':
      return 'fa-brands fa-discord';
    case 'email':
      return 'fa-solid fa-envelope';
    case 'external':
      return 'fa-solid fa-arrow-up-right-from-square';
    case 'menu':
      return 'fa-solid fa-bars';
    case 'close':
      return 'fa-solid fa-xmark';
    case 'refresh':
      return 'fa-solid fa-rotate';
    case 'settings':
      return 'fa-solid fa-gear';
    case 'theme':
      return 'fa-solid fa-palette';
    case 'language':
      return 'fa-solid fa-language';
    case 'crown':
      return 'fa-solid fa-crown';
    case 'gift':
      return 'fa-solid fa-gift';
    case 'circle-user':
      return 'fa-solid fa-circle-user';
    default:
      return 'fa-solid fa-question';
  }
};

const StyledIcon = styled.i<{ $size?: number; $color?: string }>`
  font-size: ${({ $size = 24 }) => `${$size}px`};
  color: ${({ $color = 'currentColor' }) => $color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size = 24 }) => `${$size}px`};
  height: ${({ $size = 24 }) => `${$size}px`};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.8;
  }
`;

export const Icon = memo(({ name, size, color, className, onClick }: IconProps) => {
  return (
    <StyledIcon
      className={`${getIconClass(name)} ${className || ''}`}
      $size={size}
      $color={color}
      onClick={onClick}
      aria-hidden="true"
    />
  );
});

Icon.displayName = 'Icon';
