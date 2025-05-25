import { AppConfig } from '@/types/config';

const config: AppConfig = {
  brand: {
    name: "Karev Mora",
    tagline: "Welcome to my secret lair",
    colors: {
      primary: "#1a2a6c",
      secondary: "#b21f1f",
      accent: "#fdbb2d",
      text: "#fff",
      buttonHover: "rgba(255, 255, 255, 0.15)"
    }
  },

  links: [
    {
      id: "link1",
      url: "https://onlyfans.com/karev.mora",
      icon: "fa-circle-user",
      text: "Onlyfans"
    },
    {
      id: "link2",
      url: "https://onlyfans.com/mora_xxx",
      icon: "fa-crown",
      text: "Onlyfans VIP"
    },
    {
      id: "link3",
      url: "https://www.instagram.com/karevmora",
      icon: "fa-instagram",
      text: "Instagram"
    },
    {
      id: "link4",
      url: "https://x.com/karev_mora",
      icon: "fa-x-twitter",
      text: "X"
    },
    {
      id: "link5",
      url: "https://www.amazon.com.mx/hz/wishlist/ls/Q3CH9U2XF5LT",
      icon: "fa-gift",
      text: "Amazon Wishlist",
      subtext: "Make me happy"
    },
    {
      id: "link6",
      url: "https://www.paypal.com/donate?hosted_button_id=C2J3HEW2T9GPU",
      icon: "fa-paypal",
      text: "Paypal",
      subtext: "Spoil Me"
    }
  ],

  urls: {
    landingPage: "/",
    linksPage: "/links",
    baseUrl: import.meta.env.VITE_APP_BASE_URL || "https://karevmora.com"
  },

  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "G-KZXQE4X007",
    trackEvents: true
  },

  browserDetection: {
    inAppBrowsers: [
      "Instagram", "FBAN", "FBAV", "Messenger", "Line", "Snapchat", "TikTok", "Reddit", "X"
    ],
    iosBrowsers: [
      "Safari", "CriOS", "FxiOS", "EdgiOS"
    ],
    androidBrowsers: [
      { name: "Chrome", package: "com.android.chrome" },
      { name: "Firefox", package: "org.mozilla.firefox" },
      { name: "Edge", package: "com.microsoft.emmx" },
      { name: "Brave", package: "com.brave.browser" }
    ]
  },

  messages: {
    welcome: {
      title: "Welcome to the Enchanted Realm!",
      message: "You are being redirected to the main site. Please wait..."
    },
    errors: {
      unsupportedBrowser: {
        title: "Unsupported Browser",
        message: "Sorry, your browser is not supported. Please open this page in a modern browser."
      },
      recursion: {
        title: "Redirection Error",
        message: "It looks like you are stuck in a redirect loop. Please try opening the link in your default browser."
      }
    }
  },

  fonts: {
    title: {
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap",
      fontFamily: "'UnifrakturCook', serif"
    },
    subtitle: {
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica+SC&display=swap",
      fontFamily: "'IM Fell DW Pica SC', serif"
    },
    text: {
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap",
      fontFamily: "'IM Fell English SC', serif"
    }
  },

  backgrounds: [
    '/images/background-1.jpg',
    '/images/background-2.jpg',
    '/images/background-3.jpg',
    '/images/background-4.jpg',
    '/images/background-5.jpg',
    '/images/background-6.jpg',
    '/images/background-7.jpg',
    '/images/background-8.jpg',
    '/images/background-9.jpg',
    '/images/background-10.jpg'
  ]
};

export default config; 