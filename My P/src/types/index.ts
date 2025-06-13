export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  enrollUrl: string;
  buttonText?: string;
  buttonColor?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface HeroContent {
  name: string;
  title: string;
  description: string;
  image: string;
  flipTitle?: string;
  flipSubtitle?: string;
  flipDescription?: string;
  flipStats?: {
    experience: string;
    brands: string;
    projects: string;
  };
}

export interface SliderSettings {
  speed: number;
  autoPlay: boolean;
  pauseOnHover: boolean;
}

export interface ShowcaseSettings {
  isVisible: boolean;
}

export interface WhatsAppSettings {
  phoneNumber: string;
  message: string;
  isVisible: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface SocialMediaLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  isVisible: boolean;
}

export interface FooterSettings {
  copyrightText: string;
  socialLinks: SocialMediaLink[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  type: 'section' | 'url' | 'page';
  target: string; // section ID, URL, or page name
  isVisible: boolean;
  openInNewTab?: boolean;
}

export interface HeaderSettings {
  useText: boolean;
  text: string;
  logo?: string;
  navigationLinks: NavigationLink[];
  showAdminButton: boolean;
}

export interface FontSettings {
  headings: string;
  body: string;
  display: string;
  customFonts: string[];
}

export interface SiteContent {
  hero: HeroContent;
  stats: Stat[];
  courses: Course[];
  brands: Brand[];
  features: Feature[];
  portfolio: PortfolioItem[];
  categories: Category[];
  sliderSettings?: SliderSettings;
  showcaseSettings?: ShowcaseSettings;
  whatsappSettings?: WhatsAppSettings;
  contactInfo?: ContactInfo;
  footerSettings?: FooterSettings;
  themeColors?: ThemeColors;
  headerSettings?: HeaderSettings;
  fontSettings?: FontSettings;
}