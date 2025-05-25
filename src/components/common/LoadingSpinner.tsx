import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
  thickness?: number;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{
  $size: number;
  $color: string;
  $thickness: number;
}>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: ${({ $thickness }) => $thickness}px solid ${({ $color }) => $color}20;
  border-top-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

export const LoadingSpinner = memo(({
  size = 24,
  color = 'currentColor',
  className,
  thickness = 2,
}: LoadingSpinnerProps) => {
  return (
    <Spinner
      className={className}
      $size={size}
      $color={color}
      $thickness={thickness}
      role="status"
      aria-label="Loading"
    />
  );
});

LoadingSpinner.displayName = 'LoadingSpinner'; 