import { useCallback } from 'react';
import { useAnalytics } from './useAnalytics';
import { useLocation } from 'react-router-dom';

type InteractionType =
  | 'button_click'
  | 'link_click'
  | 'form_submit'
  | 'form_input'
  | 'menu_toggle'
  | 'theme_toggle'
  | 'share'
  | 'copy'
  | 'download';

interface InteractionData {
  type: InteractionType;
  elementId?: string;
  elementClass?: string;
  elementText?: string;
  elementType?: string;
  value?: string;
  success?: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

export const useInteractionTracking = () => {
  const analytics = useAnalytics();
  const location = useLocation();

  const trackInteraction = useCallback(
    (data: InteractionData) => {
      const {
        type,
        elementId,
        elementClass,
        elementText,
        elementType,
        value,
        success,
        error,
        metadata,
      } = data;

      // Get element path for better identification
      const element = elementId ? document.getElementById(elementId) : null;
      const elementPath = element ? getElementPath(element) : null;

      analytics.trackCustomEvent('user_interaction', {
        interaction_type: type,
        element_id: elementId,
        element_class: elementClass,
        element_text: elementText,
        element_type: elementType,
        element_path: elementPath,
        value,
        success,
        error,
        page_path: location.pathname,
        ...metadata,
      });
    },
    [analytics, location.pathname]
  );

  // Helper function to get element path
  const getElementPath = (element: Element): string => {
    const path: string[] = [];
    let current: Element | null = element;

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();

      if (current.id) {
        selector += `#${current.id}`;
      } else if (current.className) {
        const classes = Array.from(current.classList).join('.');
        if (classes) {
          selector += `.${classes}`;
        }
      }

      path.unshift(selector);
      current = current.parentElement;
    }

    return path.join(' > ');
  };

  // Track button or link clicks
  const trackButtonClick = useCallback(
    (element: HTMLButtonElement | HTMLAnchorElement | null, metadata?: Record<string, any>) => {
      if (!element) return;

      trackInteraction({
        type: 'button_click',
        elementId: element.id,
        elementClass: element.className,
        elementText: element.textContent?.trim(),
        elementType: element instanceof HTMLButtonElement ? element.type : 'link',
        metadata: {
          ...metadata,
          href: element instanceof HTMLAnchorElement ? element.href : undefined,
          target: element instanceof HTMLAnchorElement ? element.target : undefined,
        },
      });
    },
    [trackInteraction]
  );

  // Track form submissions
  const trackFormSubmit = useCallback(
    (form: HTMLFormElement | null, success: boolean, error?: string) => {
      if (!form) return;

      trackInteraction({
        type: 'form_submit',
        elementId: form.id,
        elementClass: form.className,
        elementType: 'form',
        success,
        error,
        metadata: {
          form_action: form.action,
          form_method: form.method,
          form_elements: Array.from(form.elements).map(el => ({
            type: (el as HTMLElement).tagName.toLowerCase(),
            name: (el as HTMLInputElement).name,
            id: (el as HTMLElement).id,
          })),
        },
      });
    },
    [trackInteraction]
  );

  // Track form input changes
  const trackFormInput = useCallback(
    (input: HTMLInputElement | null, value: string) => {
      if (!input) return;

      trackInteraction({
        type: 'form_input',
        elementId: input.id,
        elementClass: input.className,
        elementType: input.type,
        value,
        metadata: {
          input_name: input.name,
          input_required: input.required,
          input_pattern: input.pattern,
        },
      });
    },
    [trackInteraction]
  );

  // Track menu toggles
  const trackMenuToggle = useCallback(
    (isOpen: boolean, menuType: string) => {
      trackInteraction({
        type: 'menu_toggle',
        metadata: {
          menu_type: menuType,
          menu_state: isOpen ? 'open' : 'closed',
        },
      });
    },
    [trackInteraction]
  );

  // Track theme toggles
  const trackThemeToggle = useCallback(
    (newTheme: string) => {
      trackInteraction({
        type: 'theme_toggle',
        metadata: {
          theme: newTheme,
          previous_theme: newTheme === 'light' ? 'dark' : 'light',
        },
      });
    },
    [trackInteraction]
  );

  // Track share actions
  const trackShare = useCallback(
    (platform: string, content: string) => {
      trackInteraction({
        type: 'share',
        metadata: {
          platform,
          content_type: typeof content,
          content_length: content.length,
        },
      });
    },
    [trackInteraction]
  );

  // Track copy actions
  const trackCopy = useCallback(
    (text: string, success: boolean) => {
      trackInteraction({
        type: 'copy',
        success,
        metadata: {
          text_length: text.length,
          text_type: typeof text,
        },
      });
    },
    [trackInteraction]
  );

  // Track download actions
  const trackDownload = useCallback(
    (filename: string, fileType: string, success: boolean) => {
      trackInteraction({
        type: 'download',
        success,
        metadata: {
          filename,
          file_type: fileType,
        },
      });
    },
    [trackInteraction]
  );

  return {
    trackButtonClick,
    trackFormSubmit,
    trackFormInput,
    trackMenuToggle,
    trackThemeToggle,
    trackShare,
    trackCopy,
    trackDownload,
    trackInteraction, // Generic tracking for custom interactions
  };
};
