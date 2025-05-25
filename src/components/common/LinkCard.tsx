import { memo, useState, useRef } from 'react';
import { useIcon } from '../../utils/assetManager';
import { openExternalLink } from '../../utils/linkUtils';
import { detectBrowser } from '../../utils/browserDetection';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useInteractionTracking } from '../../hooks/useInteractionTracking';
import type { IconName } from '../../generated/asset-manifest';
import {
  Card,
  CardContent,
  CardText,
  CardSubtext,
  StyledIcon,
  ErrorMessage,
} from './LinkCard.styles';

interface LinkCardProps {
  url: string;
  icon: IconName;
  text: string;
  subtext?: string;
  className?: string;
  onClick?: () => void;
  isExternal?: boolean;
  index?: number;
}

export const LinkCard = memo(({ 
  url, 
  icon, 
  text, 
  subtext, 
  className, 
  onClick, 
  isExternal = true,
  index = 0 
}: LinkCardProps) => {
  const iconAsset = useIcon(icon);
  const [error, setError] = useState<string | null>(null);
  const browserInfo = detectBrowser();
  const analytics = useAnalytics();
  const interactionTracking = useInteractionTracking();
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Track the button click
    interactionTracking.trackButtonClick(cardRef.current, {
      link_url: url,
      link_type: icon,
      link_category: subtext ? 'donation' : 'social',
      is_external: isExternal,
    });

    if (onClick) {
      onClick();
      return;
    }

    if (isExternal) {
      const success = openExternalLink({
        url,
        eventName: 'link_click',
        eventParams: {
          link_text: text,
          link_type: icon,
          is_external: true,
        },
      });

      // Track the link click with detailed analytics
      analytics.trackLinkClick({
        link_url: url,
        link_text: text,
        link_type: icon,
        link_category: subtext ? 'donation' : 'social',
        link_success: success,
        browser_name: browserInfo.name,
        browser_version: browserInfo.version,
        is_mobile: browserInfo.isMobile,
        is_in_app: browserInfo.isInAppBrowser,
      });

      if (!success) {
        setError('Please open this link in your default browser for the best experience.');
        // Track the browser warning
        analytics.trackBrowserWarning('in_app_browser');
        // Track the error interaction
        interactionTracking.trackInteraction({
          type: 'link_click',
          elementId: cardRef.current?.id,
          elementClass: cardRef.current?.className,
          elementText: text,
          success: false,
          error: 'in_app_browser',
          metadata: {
            browser_name: browserInfo.name,
            browser_version: browserInfo.version,
            is_mobile: browserInfo.isMobile,
            is_in_app: browserInfo.isInAppBrowser,
          },
        });
        // Clear error after 3 seconds
        setTimeout(() => setError(null), 3000);
      }
    } else {
      window.location.href = url;
    }
  };

  return (
    <>
      <Card 
        ref={cardRef}
        href={url} 
        className={className}
        onClick={handleClick}
        $index={index}
      >
        {iconAsset && <StyledIcon src={iconAsset.src} alt={iconAsset.name} />}
        <CardContent>
          <CardText>{text}</CardText>
          {subtext && <CardSubtext>{subtext}</CardSubtext>}
        </CardContent>
      </Card>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
});

LinkCard.displayName = 'LinkCard';