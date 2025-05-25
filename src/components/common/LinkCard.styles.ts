import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const Card = styled.a<{ $index?: number }>`
  background: ${({ theme }) => theme.colors.buttonBg};
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 16px 2vw;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1em;
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 80%;
  min-width: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  margin-left: 10vw;
  animation: ${fadeIn} 0.5s ease-out both;
  animation-delay: ${({ $index = 0 }) => `${0.1 * $index}s`};

  &:active,
  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95em;
    padding: 10px 2px;
    min-width: 0;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CardText = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 1.1em;
  font-weight: 500;
`;

export const CardSubtext = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 0.9em;
  opacity: 0.8;
  margin-top: 4px;
`;

export const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const ErrorMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.9em;
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`; 