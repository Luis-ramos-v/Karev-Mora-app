import { memo, forwardRef } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        &:hover {
          background: ${({ theme }) => theme.colors.primary}dd;
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
        &:hover {
          background: ${({ theme }) => theme.colors.secondary}dd;
        }
      `;
    case 'accent':
      return css`
        background: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.primary};
        &:hover {
          background: ${({ theme }) => theme.colors.accent}dd;
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.text};
        border: 1px solid ${({ theme }) => theme.colors.text}40;
        &:hover {
          background: ${({ theme }) => theme.colors.text}10;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isLoading: boolean;
  $isFullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  min-width: ${({ $size }) => ($size === 'small' ? '80px' : '100px')};

  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
      &::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
      }
      > * {
        visibility: hidden;
      }
    `}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        variant = 'primary',
        size = 'medium',
        isLoading = false,
        isFullWidth = false,
        leftIcon,
        rightIcon,
        children,
        disabled,
        ...props
      },
      ref
    ) => {
      return (
        <StyledButton
          ref={ref}
          $variant={variant}
          $size={size}
          $isLoading={isLoading}
          $isFullWidth={isFullWidth}
          disabled={disabled || isLoading}
          {...props}
        >
          {leftIcon}
          {children}
          {rightIcon}
        </StyledButton>
      );
    }
  )
);

Button.displayName = 'Button'; 